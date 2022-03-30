const joiValidator = require('../helpers/joi-validator');

/**
 * takes in a joi validation schema
 * and returns a middleware to run a preconfigued joi validator
 * @param {object} schema
 * @param {string} document property on request to validate
 * @returns middleware
 */
module.exports =
  (schema, document = 'body') =>
  async (req, res, next) => {
    try {
      const value = await joiValidator.validate(req[document] || {}, schema);
      req[`${document}Old`] = req[document];
      // refined request property e.g body
      req[document] = value;
      next();
    } catch (error) {
      // refined error message  
      res.status(400).json({
        status: false,
        statusCode: 0,
        error,
      });
    }
  };
