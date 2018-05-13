import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * Controller Class implementation to handle input validations
 * @class Validate
 */
export default class InputValidate {
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
      if (surname.length < 2) {
        errors.surname = 'Surname should be more than one character';
      }
      if (/(\d+)/.test(surname.trim()) || /[^a-zA-Z0-9- ]+/.test(surname.trim())) {
        errors.surname = 'Surname can only contain letters';
      }
    }

    if (!firstname || firstname === '') {
      errors.firstname = 'Firstname is Required';
    }
    if (firstname) {
      if (firstname.length < 2) {
        errors.firstname = 'Firstname should be more than one character';
      }
      if (/(\d+)/.test(firstname.trim()) || /[^a-zA-Z0-9- ]+/.test(firstname.trim())) {
        errors.firstname = 'Firstname can only contain letters';
      }
    }
    if (!username || username === '') {
      errors.username = 'Username is Required';
    }
    if (username) {
      if (username.length < 2) {
        errors.username = 'Username should be more than one character';
      }
    }
    if (/[^a-zA-Z0-9 ]+/.test(username)) {
      errors.username = 'Username can only contain alphanumeric characters';
    }
    if (!email || email === '') {
      errors.email = 'Email is Required';
    }
    if (email) {
      if (!Validator.isEmail(email.trim())) {
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

    req.body = {
      username: username.trim(),
      firstname: firstname.trim(),
      surname: surname.trim(),
      email: email.trim(),
      password,
      passwordConfirm
    };
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
  static addEvent(req, res, next) {
    const errors = {};

    const {
      name, image, startDate, endDate, description, centerId
    } = req.body;

    if (!name || name.trim() === '') {
      errors.name = 'Name is Required';
    }
    if (name) {
      if (name.length < 2) {
        errors.name = 'Event name should be more than one character';
      }
    }
    if (/[^a-zA-Z0-9- ]+/.test(name)) {
      errors.name = 'Name can only contain alphanumeric characters';
    }
    if (!image || image === '') {
      errors.image = 'Image is Required';
    }
    if (!centerId || centerId === '') {
      errors.centerId = 'Location is Required';
    }
    if (!startDate || startDate.trim() === '') {
      errors.startDate = 'Start Date is Required';
    }
    if (!endDate || endDate.trim() === '') {
      errors.endDate = 'End Date is Required';
    }
    if (!description || description.trim() === '') {
      errors.description = 'Description is Required';
    }
    if (/[^a-zA-Z0-9-., ]+/.test(description)) {
      errors.description = 'Description can only contain alphanumeric characters';
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
      name, startDate, endDate, description, centerId, image
    } = req.body;
    const eventId = parseInt(req.params.eventId.trim(), 10);

    if (!Number.isInteger(eventId)) {
      errors.eventId = 'Event Id is invalid';
    }
    if (!name || name.trim() === '') {
      errors.name = 'Name is Required';
    }
    if (name) {
      if (name.length < 2) {
        errors.name = 'Event name should be more than one character';
      }
    }
    if (/[^a-zA-Z0-9- ]+/.test(name)) {
      errors.name = 'Name can only contain alphanumeric characters';
    }
    if (!centerId || centerId === '') {
      errors.centerId = 'Center is Required';
    }
    if (!image || image === '') {
      errors.image = 'Image is Required';
    }
    if (!startDate || startDate.trim() === '') {
      errors.startDate = 'Start Date is Required';
    }
    if (!endDate || endDate.trim() === '') {
      errors.endDate = 'End Date is Required';
    }
    if (!description || description.trim() === '') {
      errors.description = 'Description is Required';
    }
    if (/[^a-zA-Z0-9-., ]+/.test(description)) {
      errors.description = 'Description can only contain alphanumeric characters';
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
    const eventId = parseInt(req.params.eventId.trim(), 10);

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
  static addCenter(req, res, next) {
    const errors = {};
    const {
      name, capacity, price, description, location, facilities, type, image
    } = req.body;
    if (!name || name.trim() === '') {
      errors.name = 'Name is Required';
    }
    if (/[^a-zA-Z0-9- ]+/.test(name)) {
      errors.name = 'Name can only contain alphanumeric characters';
    }
    if (name) {
      if (name.length < 1) {
        errors.name = 'Center name should be more than one character';
      }
    }
    if (!location || location.trim() === '') {
      errors.location = 'Location is Required';
    }
    if (location) {
      if (location.length < 2) {
        errors.location = 'Center name should be more than one character';
      }
    }
    if (/[^a-zA-Z0-9- ]+/.test(location)) {
      errors.location = 'Location can only contain alphanumeric characters';
    }
    if (!capacity || capacity === '') {
      errors.capacity = 'Capacity is Required';
    }
    if (capacity) {
      if (/^[a-zA-Z]+$/.test(capacity) || /[^a-zA-Z0-9]+/.test(capacity)) {
        errors.capacity = 'Capacity can only contain numbers';
      }
    }
    if (!image || image === '') {
      errors.image = 'Image is Required';
    }
    if (!price || price === '') {
      errors.price = 'Price is Required';
    }
    if (price) {
      if (/^[a-zA-Z]+$/.test(price) || /[^a-zA-Z0-9]+/.test(price)) {
        errors.price = 'Price can only contain numbers';
      }
    }
    if (!type || type.trim() === '') {
      errors.type = 'Type is Required';
    }
    if (/[^a-zA-Z- ]+/.test(type)) {
      errors.type = 'Type can only contain letters';
    }
    if (!facilities || facilities === '') {
      errors.facilities = 'Facilities is Required';
    }
    if (!description || description.trim() === '') {
      errors.description = 'Description is Required';
    }
    if (/[^a-zA-Z0-9-., ]+/.test(description)) {
      errors.description = 'Description can only contain alphanumeric characters';
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

    const centerId = parseInt(req.params.centerId.trim(), 10);

    if (!Number.isInteger(centerId)) {
      errors.centerId = 'Center Id is invalid';
    }
    if (!name || name.trim() === '') {
      errors.name = 'Name is Required';
    }
    if (name) {
      if (name.length < 2) {
        errors.name = 'Name should be more than one character';
      }
    }
    if (/[^a-zA-Z0-9- ]+/.test(name)) {
      errors.name = 'Name can only contain alphanumeric characters';
    }
    if (!location || location.trim() === '') {
      errors.location = 'Location is Required';
    }
    if (location) {
      if (location.length < 2) {
        errors.location = 'Location should be more than one character';
      }
    }
    if (/[^a-zA-Z0-9- ]+/.test(location)) {
      errors.location = 'Location can only contain alphanumeric characters';
    }
    if (!capacity || capacity === '') {
      errors.capacity = 'Capacity is Required';
    }
    if (capacity) {
      if (/^[a-zA-Z]+$/.test(capacity) || /[^a-zA-Z0-9]+/.test(capacity)) {
        errors.capacity = 'Capacity can only contain numbers';
      }
    }
    if (!image || image === '') {
      errors.image = 'Image is Required';
    }
    if (!price || price === '') {
      errors.price = 'Price is Required';
    }
    if (price) {
      if (/^[a-zA-Z]+$/.test(price) || /[^a-zA-Z0-9]+/.test(price)) {
        errors.price = 'Price can only contain numbers';
      }
    }
    if (!type || type.trim() === '') {
      errors.type = 'Type is Required';
    }
    if (/[^a-zA-Z- ]+/.test(type)) {
      errors.type = 'Type can only contain letters';
    }
    if (!facilities || facilities === '') {
      errors.facilities = 'Facilities is Required';
    }
    if (!description || description.trim() === '') {
      errors.description = 'Description is Required';
    }
    if (/[^a-zA-Z0-9-., ]+/.test(description)) {
      errors.description = 'Description can only contain alphanumeric characters';
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
    const centerId = parseInt(req.params.centerId.trim(), 10);

    if (!Number.isInteger(centerId)) {
      errors.centerId = 'Center Id is invalid';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({ errors });
    }
    return next();
  }
}
