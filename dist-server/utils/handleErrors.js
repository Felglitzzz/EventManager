'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @param { object } error sequelize generated errors
 * @return { object } messages to display
 */
var errorMessages = function errorMessages(error) {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return {
      message: error.errors[0].message,
      error: error.errors[0].message,
      type: 'uniqueError'
    };
  } else if (error.name === 'SequelizeValidationError' && error.errors[0].type === 'notNull Violation') {
    return {
      error: 'Please fill in the required field(s)',
      type: 'validationError'
    };
  } else if (error.name === 'SequelizeValidationError') {
    return {
      message: error.errors[0].message,
      error: error.errors[0].message,
      type: 'validationError'
    };
  }
  return error.name;
};

exports.default = errorMessages;
//# sourceMappingURL=handleErrors.js.map