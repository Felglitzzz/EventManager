/**
 * @param { object } error sequelize generated errors
 * @return { object } messages to display
 */
const errorMessages = (error) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    return {
      message: error.errors[0].message,
      error: error.errors[0].message,
      type: 'uniqueError'
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

export default errorMessages;
