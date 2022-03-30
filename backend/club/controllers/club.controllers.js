const Joi = require('joi');
const Club = require('../repositories/club.repository');

module.exports = class {
  static get createSchema() {
    return Joi.object().keys({
      name: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      address: Joi.string().required(),
    });
  }

  // eslint-disable-next-line no-unused-vars
  static async createClub(req, res) {
    const userId = req.user.userId || req.user.id;

    const response = await Club.buildClub({ userId, ...req.body });

    res.data(response);
  }

  static async fetchClubs(req, res) {
    const userId = req.user.id || req.user.userId;

    const response = await Club.allClub({
      userId,
      limit: +req.query.limit || 20,
      offset: +req.query.offset || 0,
    });

    res.data(response);
  }

  static async getClub(req, res) {
    const id = req.params.id;

    const response = await Club.individual({ id });

    res.data(response);
  }
};
