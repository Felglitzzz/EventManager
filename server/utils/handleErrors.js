/**
   * This function handles sequelize errors
   * @name errorMessages
   *
   * @param {object} error - error object
   *
   * @returns {object} validation error messages object or content of request body object
   */
const errorMessages = (error) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return {
      message: error.errors[0].message,
      error: error.errors[0].message,
      type: 'uniqueError'
    };
  }
  if (error.name === 'SequelizeValidationError') {
    return {
      error: error.errors[0].message,
      type: 'validationError'
    };
  }
  return error.name;
};

export default errorMessages;
