const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;

module.exports = {
  sign(payload) {
    try {
      return jwt.sign(payload, JWT_SECRET_KEY);
    } catch (e) {
      return false;
    }
  },
  verify(payload) {
    try {
      return jwt.verify(payload, JWT_SECRET_KEY);
    } catch (e) {
      return null;
    }
  },
};
