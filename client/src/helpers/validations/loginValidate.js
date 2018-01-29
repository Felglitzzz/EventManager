import isEmpty from 'lodash/isEmpty';


const validate = (data) => {
  const errors = {};
  const expectedLength = 8;

  Object.keys(data).forEach((field) => {

    if (!data[field].length) {
      errors[field] = `${field} cannot be empty`;
    }
  });

  // if (data.password.length < expectedLength) {
  //   errors.password = 'Password should be at least 8 characters';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validate;
