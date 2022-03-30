const Joi = require('joi');
const Users = require('../repositories/users.repository');

module.exports = class {
  static get createSchema() {
    return Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().regex(/^\d+$/).required(),
    });
  }

  static get loginSchema() {
    return Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
  }

  // eslint-disable-next-line no-unused-vars
  static async createUser(req, res) {
    const user = await Users.user(req.body);

    res.data(user);
  }

  static async loginUser(req, res) {
    const response = await Users.login(req.body);

    res.data(response);
  }

  static async fetchUsers(req, res) {
    const users = await Users.allUsers({
      limit: +req.query.limit || 20,
      offset: +req.query.offset || 0,
    });

    res.data(users);
  }

  static async getUsers(req, res) {
    const id = req.params.id;

    const response = await Users.individual({ id });

    res.data(response);
  }
};
