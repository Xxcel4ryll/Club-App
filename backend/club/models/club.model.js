const { Model, DataTypes, Op } = require('sequelize');
const { seq: DB } = require('../../sequelize');
const jwt = require('../../helpers/jwt');
const _ = require('lodash');
const moment = require('moment');

class Club extends Model {
  /**
   * creates club
   * @param {Object} params
   * @returns
   */
  static async buildClub({ name, ...data }) {
    const [club, created] = await this.findOrCreate({
      where: {
        [Op.or]: [{ name }],
      },
      defaults: {
        name,
        ...data,
      },
    });

    if (!created) return Promise.reject('Club already exist');

    return club.toJSON();
  }

  /**
   * Fetch All created club
   * @param {Object} params
   * @param {string} params.limit
   * @param {string} params.offset
   * @returns
   */
  static async allClub({ userId, limit, offset }) {
    return await this.findAndCountAll({
      where: { userId },
      limit,
      offset,
    });
  }

  /**
   * Fetch specific club
   * @param {Object} params
   * @param {string} params.id
   * @returns
   */
  static async individual({ id }) {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}

Club.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    postal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'clubs',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Club;
