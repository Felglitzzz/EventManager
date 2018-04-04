import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * This class validates signup and login inputs from users
 */
export default class Validate {
  /**
   * This method validates the signup
   *
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   *
   * @returns {object} validation error messages object
   * @memberof Validate
   */
  static signUp(req) {
    const errors = {};
    const {
      surname,
      firstname,
      username,
      email,
      password,
      passwordConfirm
    } = req;

    if (!surname || surname === '' || typeof surname === 'undefined') {
      errors.surname = 'Surname is Required';
    }

    if (surname) {
      if (surname.length < 3) {
        errors.surname = 'Surname should be more than two characters';
      }
    }

    if (/(\d+)/.test(surname) || /[^a-zA-Z0-9]+/.test(surname)) {
      errors.surname = 'Surname can only contain letters';
    }

    if (!firstname || firstname === '' || typeof firstname === 'undefined') {
      errors.firstname = 'Firstname is Required';
    }

    if (firstname) {
      if (firstname.length < 3) {
        errors.firstname = 'Firstname should be more than two characters';
      }
    }

    if (/(\d+)/.test(firstname) || /[^a-zA-Z0-9]+/.test(firstname)) {
      errors.firstname = 'Firstname can only contain letters';
    }

    if (!username || username === '' || typeof username === 'undefined') {
      errors.username = 'Username is Required';
    }

    if (username) {
      if (username.length < 3) {
        errors.username = 'Username should be more than two characters';
      }
    }

    if (!email || email === '' || typeof email === 'undefined') {
      errors.email = 'Email is Required';
    }

    if (email) {
      if (!Validator.isEmail(email)) {
        errors.email = 'Invalid email, Enter a valid email, like so: you@mail.com';
      }
    }

    if (!password || password === '' || typeof password === 'undefined') {
      errors.password = 'Password is Required';
    }

    if (password) {
      if (password.length < 8) {
        errors.password = 'Password should not be less than 8 characers';
      }
    }

    if (password.length >= 8) {
      if (password !== passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  /**
   * This method validates user login inputs
   *
   * @static
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} validation error messages object
   * @memberof Validate
   */
  static login(req) {
    const errors = {};
    const { username, password } = req;

    if (!username || username === '' || typeof username === 'undefined') {
      errors.username = 'Username is Required';
    }

    if (!password || password === '' || typeof password === 'undefined') {
      errors.password = 'Password is Required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
  /**
   * This method validates create event inputs
   * @static
   *
   * @param {object} req
   * @param {object} image
   *
   * @returns {object} validation error messages object
   * @memberof Validate
   */
  static createEvent(req, image) {
    const errors = {};
    const {
      name, date, time, description, centerId
    } = req;

    if (!name || name === '') {
      errors.name = 'Name is Required';
    }

    if (name) {
      if (name.length < 3) {
        errors.name = 'Event name should be more than two characters';
      }
    }

    if (!centerId || centerId === '') {
      errors.centerId = 'Center is Required';
    }

    if (!date || date === '') {
      errors.date = 'Date is Required';
    }

    if (!image || image === '') {
      errors.image = 'Image is Required';
    }

    if (!time || time === '') {
      errors.time = 'Time is Required';
    }

    if (!description || description === '') {
      errors.description = 'Description is Required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  /**
   * This method validates edit event inputs
   * @static
   *
   * @param {object} req
   * @param {object} image
   *
   * @returns {object} validation error messages object
   * @memberof Validate
   */
  static editEvent(req) {
    const errors = {};
    const {
      name, date, time, description, centerId
    } = req;

    if (!name || name === '') {
      errors.name = 'Name is Required';
    }

    if (!centerId || centerId === '') {
      errors.centerId = 'Center is Required';
    }

    if (!date || date === '') {
      errors.date = 'Date is Required';
    }

    if (!time || time === '') {
      errors.time = 'Time is Required';
    }

    if (!description || description === '') {
      errors.description = 'Description is Required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  /**
   * This method validates create center inputs
   * @static
   *
   * @param {object} req
   * @param {object} image
   *
   * @returns {object} validation error messages object
   * @memberof Validate
   */
  static createCenter(req, image) {
    const errors = {};
    const {
      name, capacity, price, description, location, facilities, type
    } = req;

    console.log(facilities, '%%%%%&&&&&&&')

    if (!name || name === '') {
      errors.name = 'Name is Required';
    }

    if (name) {
      if (name.length < 3) {
        errors.name = 'Center name should be more than two characters';
      }
    }

    if (!location || location === '') {
      errors.location = 'Location is Required';
    }

    if (location) {
      if (location.length < 3) {
        errors.location = 'Center name should be more than two characters';
      }
    }

    if (!capacity || capacity === '') {
      errors.capacity = 'Capacity is Required';
    }

    if (/^[a-zA-Z]+$/.test(capacity) || /[^a-zA-Z0-9]+/.test(capacity)) {
      errors.capacity = 'Capacity can only contain numbers';
    }

    if (!image || image === '') {
      errors.image = 'Image is Required';
    }

    if (!price || price === '') {
      errors.price = 'Price is Required';
    }

    if (/^[a-zA-Z]+$/.test(price) || /[^a-zA-Z0-9]+/.test(price)) {
      errors.price = 'Price can only contain numbers';
    }

    if (!type || type === '') {
      errors.type = 'Type is Required';
    }

    if (!facilities || facilities === [] || facilities.length === 0) {
      console.log(facilities, 'ooooooppopopopop');
      errors.facilities = 'Facilities is Required';
    }

    if (!description || description === '') {
      errors.description = 'Description is Required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  /**
   * This method validates edit center inputs
   * @static
   *
   * @param {object} req
   * @param {object} image
   *
   * @returns {object} validation error messages object
   * @memberof Validate
   */
  static editCenter(req) {
    const errors = {};
    const {
      name, capacity, price, description, location, facilities, type
    } = req;

    if (!name || name === '') {
      errors.name = 'Name is Required';
    }

    if (name) {
      if (name.length < 3) {
        errors.name = 'Center name should be more than two characters';
      }
    }

    if (!location || location === '') {
      errors.location = 'Location is Required';
    }

    if (location) {
      if (location.length < 3) {
        errors.location = 'Center name should be more than two characters';
      }
    }

    if (!capacity || capacity === '') {
      errors.capacity = 'Capacity is Required';
    }

    if (/^[a-zA-Z]+$/.test(capacity) || /[^a-zA-Z0-9]+/.test(capacity)) {
      errors.capacity = 'Capacity can only contain numbers';
    }

    if (!price || price === '') {
      errors.price = 'Price is Required';
    }

    if (/^[a-zA-Z]+$/.test(price) || /[^a-zA-Z0-9]+/.test(price)) {
      errors.price = 'Price can only contain numbers';
    }

    if (!type || type === '') {
      errors.type = 'Type is Required';
    }

    if (!facilities || facilities === [] || facilities.length === 0) {
      errors.facilities = 'Facilities is Required';
    }

    if (!description || description === '') {
      errors.description = 'Description is Required';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }
}
