const { Model, DataTypes, Op } = require('sequelize');
const { seq: DB } = require('../../sequelize');
const {
  hashPassword,
  comparePassword,
} = require('../../helpers/hash-password');
const jwt = require('../../helpers/jwt');
const _ = require('lodash');
const moment = require('moment');

class Admin extends Model {
  /**
   * creates an admin
   * @param {Object} params
   * @param {string} params.phoneNumber
   * @param {string} params.email
   * @returns
   */
  static async admin({ email, password, ...data }) {
    const [user, created] = await this.findOrCreate({
      where: {
        [Op.or]: [{ email }],
      },
      defaults: {
        email,
        password: await hashPassword(password),
        ...data,
      },
    });

    if (!created) return Promise.reject('Admin already exist');

    const token = await jwt.sign({
      id: user.id,
      role: 'Admin',
    });

    return await _.omit({ ...user.toJSON(), token }, ['password']);
  }

  /**
   * Admin Login
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
      id: userExist.id,
      role: 'Admin',
    });

    return _.omit({ ...userExist.toJSON(), token }, ['password']);
  }

  /**
   * Fetch All registered admin
   * @param {Object} params
   * @param {string} params.limit
   * @param {string} params.offset
   * @returns
   */
  static async allAdmin({ limit, offset }) {
    return await this.findAndCountAll({
      limit,
      offset,
    });
  }

  /**
   * Fetch specific admin
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

Admin.init(
  {
    id: {
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
      defaultValue: 'Admin',
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
    tableName: 'admin',
    underscored: true,
    timestamps: true,
    sequelize: DB,
  }
);

module.exports = Admin;
