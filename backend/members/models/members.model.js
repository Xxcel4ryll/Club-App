const { Model, DataTypes, Op } = require('sequelize');
const { seq: DB } = require('../../sequelize');
const jwt = require('../../helpers/jwt');
const { sendInvite } = require('../../helpers/send_mail');
const clubModel = require('../../club/models/club.model');
const _ = require('lodash');

class Members extends Model {
  /**
   * registers a memebr
   * @param {Object} params
   * @param {string} params.email
   * @returns
   */
  static async user({ email, creatorId, ...data }) {
    const club = await clubModel.findOne();

    const [memberExist, created] = await this.findOrCreate({
      where: {
        email,
        creatorId,
        clubId: club.id,
      },
      defaults: {
        email,
        ...data,
      },
    });

    if (!created) return Promise.reject('Member already exist');

    sendInvite({ message: 'Young Boys', reference: memberExist.memberId });
    return await _.omit({ ...memberExist.toJSON() });
  }

  /**
   * Fetch All registered members
   * @param {Object} params
   * @param {string} params.limit
   * @param {string} params.offset
   * @returns
   */
  static async allMembers({ creatorId, limit, offset }) {
    return await this.findAndCountAll({
      where: {
        creatorId,
        status: 'ACCEPTED',
      },
      limit,
      offset,
    });
  }

  /**
   * Verify member
   * @param {Object} params
   * @param {string} params.reference
   * @returns
   */
  static async verifyMember({ reference }) {
    const [response] = await this.update(
      {
        status: 'ACCEPTED',
      },
      {
        where: {
          memberId: reference,
          status: 'PENDING',
        },
      }
    );

    if (response) {
      return 'Congratulations, you have successfully become a member';
    }

    return Promise.reject('Invalid link');
  }

  /**
   * Fetch specific user
   * @param {Object} params
   * @param {string} params.id
   * @returns
   */
  static async individual({ id }) {
    return await this.findOne({
      where: {
        memberId: id,
        status: 'ACCEPTED',
      },
    });
  }

  /**
   * Delete member
   * @param {Object} params
   * @param {string} params.id
   * @returns
   */
  static async removeMember({ id, creatorId, clubId }) {
    return !!this.destroy({
      where: {
        memberId: id,
        creatorId,
        clubId,
      },
    });
  }
}

Members.init(
  {
    memberId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    clubId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'PENDING',
      values: ['PENDING', 'ACCEPTED'],
    },

    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'Member',
      allowNull: false,
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'members',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Members;
