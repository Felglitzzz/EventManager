import isEmpty from 'lodash/isEmpty';

const validate = (data) => {
  return
  if (data.password.value !== data.passwordConfirm.value) {
    console.log(data.password.value)
    data.passwordConfirm.setCustomValidity('Passwords do not match');
  } else {
    data.passwordConfirm.setCustomValidity('');
  };
};

export default validate;
