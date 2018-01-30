import isEmpty from 'lodash/isEmpty';

const validate = (data) => {
  const errors = {};
  const expectedLength = 8;

  Object.keys(data).forEach((field) => {
    if (!data[field].length) {
      errors[field] = 'This field is required';
    }
  });

  if (data.password.length < expectedLength) {
    errors.password = 'Password should be at least 8 characters';
  }

  if (!data.confirmPassword.length) {
    errors.confirmPassword = 'This field is required';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validate;
