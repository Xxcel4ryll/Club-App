const { Model, DataTypes, Op } = require('sequelize');
const { seq: DB } = require('../../sequelize');
const {
  hashPassword,
  comparePassword,
} = require('../../helpers/hash-password');
const jwt = require('../../helpers/jwt');
const _ = require('lodash');
const moment = require('moment');

class Users extends Model {
  /**
   * registers a user
   * @param {Object} params
   * @param {string} params.phoneNumber
   * @param {string} params.email
   * @returns
   */
  static async user({ email, password, ...data }) {
    const [userExist, created] = await this.findOrCreate({
      where: {
        [Op.or]: [{ email }],
      },
      defaults: {
        email,
        password: await hashPassword(password),
        ...data,
      },
    });

    if (!created) return Promise.reject('User already exist');

    const token = await jwt.sign({
      id: userExist.userId,
      role: 'User',
    });

    return await _.omit({ ...userExist.toJSON(), token }, ['password']);
  }

  /**
   * Sign In a User
   * @param {Object} params
   * @param {string} params.email
   * @param {string} params.password
   * @returns
   */
  static async login(data) {
    const { email, password } = data;

    const userExist = await this.findOne({
      where: {
        email,
      },
    });

    if (!userExist) {
      return Promise.reject('email or password incorrect');
    }

    const match = await comparePassword(password, userExist.password);

    if (!match) {
      return Promise.reject('email or password incorrect');
    }

    const token = await jwt.sign({
      id: userExist.userId,
      role: 'User',
    });

    return _.omit({ ...userExist.toJSON(), token }, ['password']);
  }

  /**
   * Fetch All registered user
   * @param {Object} params
   * @param {string} params.limit
   * @param {string} params.offset
   * @returns
   */
  static async allUsers({ limit, offset }) {
    return await this.findAndCountAll({
      limit,
      offset,
    });
  }

  /**
   * Fetch user
   * @param {Object} params
   * @param {string} params.id
   * @returns
   */
  static async individual({ id }) {
    return await this.findOne({
      where: {
        userId: id,
      },
    });
  }
}

Users.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'User',
      allowNull: false,
    },

    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    phoneNumber: {
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
    tableName: 'users',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Users;
