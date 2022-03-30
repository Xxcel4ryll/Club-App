const Joi = require('joi');
const Admin = require('../repositories/admin.repository');

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
  static async createAdmin(req, res) {
    const admin = await Admin.admin(req.body);

    res.data(admin);
  }

  static async loginAdmin(req, res) {
    const response = await Admin.login(req.body);

    res.data(response);
  }

  static async fetchAdmin(req, res) {
    const response = await Admin.allAdmin({
      limit: +req.query.limit || 20,
      offset: +req.query.offset || 0,
    });

    res.data(response);
  }

  static async getAdmin(req, res) {
    const id = req.params.id;

    const response = await Admin.individual({ id });

    res.data(response);
  }
};
