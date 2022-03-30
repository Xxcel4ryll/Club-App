const Joi = require('joi');

module.exports = class {
  /**
   * object payload and schema it should be validated against
   * @param {object} payload
   * @param {object} schema
   * @returns
   */
  static validate(payload, schema) {
    try {
      return Joi.attempt(payload, schema, {
        abortEarly: false,
        convert: true,
        stripUnknown: true,
      });
    } catch (errors) {
      return Promise.reject(this.modifyErrors(errors));
    }
  }

  /**
   * reducer callback function to turn joi error message into a simple object
   * it takes the label or key property and makes it a key in the accumulatedObject
   * while the value of the key would be the error message
   * @param {Object} accumulatedObject
   * @param {Object} currentError
   */
  static errorReducer(accumulatedErrorObject, currentError) {
    return Object.assign(accumulatedErrorObject, {
      [currentError.context.label || currentError.context.key]:
        currentError.message.replace(new RegExp('"', 'ig'), ''),
    });
  }

  /**
   * modifies error message to simple readable format
   * @param {object} errors
   * @returns
   */
  static modifyErrors(errors) {
    return !errors.details
      ? errors.message
      : errors.details.reduce(this.errorReducer, {});
  }
};
