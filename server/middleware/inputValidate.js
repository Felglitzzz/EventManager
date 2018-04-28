import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Controller Class implementation to handle input validations
 * @class Validate
 */
export default class Validate {
  /**
   * This middleware validates inputs data for sign up
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next - runs the next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static signUp(req, res, next) {
    const errors = {};
    const {
      surname, firstname, username, email, password, passwordConfirm
    } = req.body;

    if (!surname || surname === '') {
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
    if (!firstname || firstname === '') {
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
    if (!username || username === '') {
      errors.username = 'Username is Required';
    }
    if (username) {
      if (username.length < 3) {
        errors.username = 'Username should be more than two characters';
      }
    }
    if (!email || email === '') {
      errors.email = 'Email is Required';
    }
    if (email) {
      if (!Validator.isEmail(email)) {
        errors.email = 'Invalid email, Enter a valid email, like so: you@mail.com';
      }
    }
    if (!password || password === '') {
      errors.password = 'Password is Required';
    }
    if (password) {
      if (password.length < 8) {
        errors.password = 'Password should not be less than 8 characers';
      }
    }
    if (password) {
      if (password !== passwordConfirm) {
        errors.password = 'Passwords must match';
      }
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }
  /**
   * This middleware validates user login inputs
   * @static
   *
   * @param {object} req - express request object
   * @param {object} res - express response object
   * @param {object} next - runs next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static login(req, res, next) {
    const errors = {};
    const { username, password } = req.body;
    if (!username || username === '') {
      errors.username = 'Username is Required';
    }
    if (!password || password === '') {
      errors.password = 'Password is Required';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }
  /**
   * This middleware validates create event inputs
   * @static
   *
   * @param {object} req - express request object
   * @param {object} res - express response object
   * @param {object} next - runs next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static createEvent(req, res, next) {
    const errors = {};

    const {
      name, image, date, time, description, centerId
    } = req.body;

    if (!name || name === '') {
      errors.name = 'Name is Required';
    }
    if (name) {
      if (name.length < 3) {
        errors.name = 'Event name should be more than two characters';
      }
    }
    if (!image || image === '') {
      errors.image = 'Image is Required';
    }
    if (!date || date === '') {
      errors.date = 'Date is Required';
    }
    if (!centerId || centerId === '') {
      errors.centerId = 'Location is Required';
    }
    if (!time || time === '') {
      errors.time = 'Time is Required';
    }
    if (!description || description === '') {
      errors.description = 'Description is Required';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }

  /**
   * This middleware validates inputs for edit event form
   * @static
   *
   * @param {object} req - express request object
   * @param {object} res - express response object
   * @param {object} next - run next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static editEvent(req, res, next) {
    const errors = {};
    const {
      name, date, time, description, centerId, image
    } = req.body;
    const eventId = parseInt(req.params.eventId, 10);

    if (!Number.isInteger(eventId)) {
      errors.eventId = 'Event Id is invalid';
    }
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
    if (!image || image === '') {
      errors.image = 'Image is Required';
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
    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }

  /**
   * This middleware validates delete event request
   * @static
   *
   * @param {object} req - express request object
   * @param {object} res - express response object
   * @param {object} next - run next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static checkEventId(req, res, next) {
    const errors = {};
    const eventId = parseInt(req.params.eventId, 10);

    if (!Number.isInteger(eventId)) {
      errors.eventId = 'Event Id is invalid';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }

  /**
   * This middleware validates inputs for create center
   * @static
   *
   * @param {object} req - express request object
   * @param {object} res - express response object
   * @param {object} next - runs next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static createCenter(req, res, next) {
    const errors = {};
    const {
      name, capacity, price, description, location, facilities, type, image
    } = req.body;
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
    if (!facilities || facilities === '') {
      errors.facilities = 'Facilities is Required';
    }
    if (!description || description === '') {
      errors.description = 'Description is Required';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }

  /**
   * This middleware validates inputs for edit center
   *
   * @static
   *
   * @param {object} req - express request object
   * @param {object} res - express response object
   * @param {object} next - run next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static editCenter(req, res, next) {
    const errors = {};
    const {
      name, capacity, price, description, location, facilities, type, image
    } = req.body;

    const centerId = parseInt(req.params.centerId, 10);

    if (!Number.isInteger(centerId)) {
      errors.centerId = 'Center Id is invalid';
    }
    if (!name || name === '') {
      errors.name = 'Name is Required';
    }
    if (name) {
      if (name.length < 3) {
        errors.name = 'Name ame should be more than two characters';
      }
    }
    if (!location || location === '') {
      errors.location = 'Location is Required';
    }
    if (location) {
      if (location.length < 3) {
        errors.location = 'Location should be more than two characters';
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
    if (!facilities || facilities === '') {
      errors.facilities = 'Facilities is Required';
    }
    if (!description || description === '') {
      errors.description = 'Description is Required';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }

  /**
   * This middleware validates delete center request params
   * @static
   *
   * @param {object} req - express request object
   * @param {object} res - express response object
   * @param {object} next - run next function
   *
   * @returns {object} validation error messages object or content of request body object
   * @memberof Validate
   */
  static checkCenterId(req, res, next) {
    const errors = {};
    const centerId = parseInt(req.params.centerId, 10);

    if (!Number.isInteger(centerId)) {
      errors.centerId = 'Center Id is invalid';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }
}
