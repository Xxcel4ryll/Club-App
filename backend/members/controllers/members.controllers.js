const Joi = require('joi');
const Members = require('../models/members.model');

module.exports = class {
  static get createSchema() {
    return Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().regex(/^\d+$/).required(),
    });
  }

  static get deleteSchema() {
    return Joi.object().keys({
      clubId: Joi.string().required(),
    });
  }

  // eslint-disable-next-line no-unused-vars
  static async createMember(req, res) {
    const creatorId = req.user.id || req.user.userId;

    const user = await Members.user({ creatorId, ...req.body });

    res.data(user);
  }

  static async fetchMembers(req, res) {
    const response = await Members.allMembers({
      creatorId: req.user.id || req.user.userId,
      limit: +req.query.limit || 20,
      offset: +req.query.offset || 0,
    });

    res.data(response);
  }

  static async getMembers(req, res) {
    const id = req.params.id;

    const response = await Members.individual({ id });

    res.data(response);
  }

  static async verify(req, res) {
    const reference = req.params.id;

    const response = await Members.verifyMember({ reference });

    res.data(response);
  }

  static async deleteMember(req, res) {
    const id = req.params.id;
    const creatorId = req.user.id || req.user.userId;

    const response = await Members.removeMember({ id, creatorId, ...req.body });

    res.data(response);
  }
};
