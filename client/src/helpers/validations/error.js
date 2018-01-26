import isEmpty from 'lodash/isEmpty';

// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';


// const validateInput = (userData) => {
//   let errors = {};

//   if (Validator.isNull(userData.username)) {
//     errors.username = 'This field is required';
//   }

//   if (Validator.isNull(userData.password)) {
//     errors.password = 'This field is required';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };

// export default validateInput;

// const validate = (form) => {
//   const error = {};

//   Object.keys(form).forEach((field) => {

//     const expectedLength = 8;

//     if (!form[field].length) {
//       error[field] = `${field} cannot be empty`;
//     }

//     if (form.password.length < expectedLength) {
//       error.password = 'Password must be more than 8 characters';
//     }
//   });

//   // if (!/\@/.test(form.email)) {
//   //   error.email = 'Invalid email. Please enter a valid email';
//   // }

//   return error;
// };

// export default validate;
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
