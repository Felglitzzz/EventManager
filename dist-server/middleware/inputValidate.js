'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This class validates signup and login inputs from users
 */
var Validate = function () {
  function Validate() {
    _classCallCheck(this, Validate);
  }

  _createClass(Validate, null, [{
    key: 'signUp',

    /**
     * This middleware validates the signup
     *
     * @static
     *
     * @param {object} req request object
     * @param {object} res response object
     * @param {object} next passes action to following controller
     *
     * @returns {object} validation error messages object or contents of request.body object
     * @memberof Validate
     */
    value: function signUp(req, res, next) {
      var errors = {};
      var _req$body = req.body,
          surname = _req$body.surname,
          firstname = _req$body.firstname,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password,
          passwordConfirm = _req$body.passwordConfirm;


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
        if (!_validator2.default.isEmail(email)) {
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
      if (!(0, _isEmpty2.default)(errors)) {
        return res.status(400).json({ errors: errors });
      }
      return next();
    }
    /**
     * This middleware validates user login inputs
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} validation error messages object or contents of request.body object
     * @memberof Validate
     */

  }, {
    key: 'login',
    value: function login(req, res, next) {
      var errors = {};
      var _req$body2 = req.body,
          username = _req$body2.username,
          password = _req$body2.password;

      if (!username || username === '') {
        errors.username = 'Username is Required';
      }
      if (!password || password === '') {
        errors.password = 'Password is Required';
      }
      if (!(0, _isEmpty2.default)(errors)) {
        return res.status(400).json({ errors: errors });
      }
      return next();
    }
    /**
     * This middleware validates inputs for create events
     *
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} validation error messages object or contents of request.body object
     * @memberof Validate
     */

  }, {
    key: 'createEvent',
    value: function createEvent(req, res, next) {
      var errors = {};

      var _req$body3 = req.body,
          name = _req$body3.name,
          image = _req$body3.image,
          date = _req$body3.date,
          time = _req$body3.time,
          description = _req$body3.description,
          centerId = _req$body3.centerId;


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
      if (!(0, _isEmpty2.default)(errors)) {
        return res.status(400).json({ errors: errors });
      }
      return next();
    }

    /**
     * This middleware validates inputs for edit event form
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} validation error messages object or contents of request body object
     * @memberof Validate
     */

  }, {
    key: 'editEvent',
    value: function editEvent(req, res, next) {
      var errors = {};
      var _req$body4 = req.body,
          name = _req$body4.name,
          date = _req$body4.date,
          time = _req$body4.time,
          description = _req$body4.description,
          centerId = _req$body4.centerId,
          image = _req$body4.image;

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
      if (!(0, _isEmpty2.default)(errors)) {
        return res.status(400).json({ errors: errors });
      }
      return next();
    }

    /**
     * This middleware validates inputs for create events
     *
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} validation error messages object or contents of request.body object
     * @memberof Validate
     */

  }, {
    key: 'createCenter',
    value: function createCenter(req, res, next) {
      var errors = {};
      var _req$body5 = req.body,
          name = _req$body5.name,
          capacity = _req$body5.capacity,
          price = _req$body5.price,
          description = _req$body5.description,
          location = _req$body5.location,
          facilities = _req$body5.facilities,
          type = _req$body5.type,
          image = _req$body5.image;

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
      if (!(0, _isEmpty2.default)(errors)) {
        return res.status(400).json({ errors: errors });
      }
      return next();
    }

    /**
     * This middleware validates inputs for create events
     *
     * @static
     *
     * @param {object} req
     * @param {object} res
     * @param {object} next
     *
     * @returns {object} validation error messages object or contents of request.body object
     * @memberof Validate
     */

  }, {
    key: 'editCenter',
    value: function editCenter(req, res, next) {
      var errors = {};
      var _req$body6 = req.body,
          name = _req$body6.name,
          capacity = _req$body6.capacity,
          price = _req$body6.price,
          description = _req$body6.description,
          location = _req$body6.location,
          facilities = _req$body6.facilities,
          type = _req$body6.type,
          image = _req$body6.image;

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
      if (!(0, _isEmpty2.default)(errors)) {
        return res.status(400).json({ errors: errors });
      }
      return next();
    }
  }]);

  return Validate;
}();

exports.default = Validate;
//# sourceMappingURL=inputValidate.js.map