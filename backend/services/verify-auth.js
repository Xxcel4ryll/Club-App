const { upperFirst } = require('lodash');
const User = require('../users/models/users.model');
const Admin = require('../admin/models/admin.model');

module.exports = class {
  static async checkRole({ role, id }) {
    const method = `check${upperFirst(role)}`;
    if (!this[method]) {
      return Promise.reject('role does not exist');
    }

    return this[method]({
      id,
    });
  }

  static async checkUser({ id }) {
    return User.findOne({
      where: {
        userId: id,
      },
    });
  }

  static async checkAdmin({ id }) {
    return Admin.findOne({
      where: {
        id,
      },
    });
  }
};
