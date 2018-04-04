'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import jwt from 'jsonwebtoken';


var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _handleErrors = require('../utils/handleErrors');

var _handleErrors2 = _interopRequireDefault(_handleErrors);

var _helper = require('../utils/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var users = _models2.default.user;
// const secret = process.env.SECRET;

/**
 * This method handles all user based routes
 */

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'createUser',

    /**
     * @static
     * @param {object} req object
     * @param {object} res object
     *
     * @returns {object} created User object
     */
    value: function createUser(req, res) {
      // const { username } = req.body;
      // const query = {
      //   where: {
      //     $and: [
      //       { username }
      //     ]
      //   }
      // };
      // users.find(query).then((foundUser) => {
      //   if (foundUser) {
      //     return res.status(409).json({ message: `username ${username} is already taken` });
      //   }
      users.create({
        surname: req.body.surname,
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      }).then(function (user) {
        var userData = {
          id: user.id
        };
        var token = _helper2.default.generateToken(userData);
        res.status(201).json({
          message: 'User created',
          token: token,
          user: {
            userId: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          }
        });
      }).catch(function (error) {
        var errMessages = (0, _handleErrors2.default)(error);
        if (errMessages.type === 'validationError') {
          return res.status(400).json({ error: errMessages.error });
        }
        if (errMessages.type === 'uniqueError') {
          return res.status(409).json({ error: errMessages.error });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
      });
    }
    /**
     * login
     *
     * @param {object} req object
     * @param {object} res object
     *
     * @returns {json} logged in user object
     */

  }, {
    key: 'login',
    value: function login(req, res) {
      var _req$body = req.body,
          username = _req$body.username,
          password = _req$body.password;


      return users.findOne({ where: { username: username } }).then(function (user) {
        if (user && _bcrypt2.default.compareSync(password, user.password)) {
          var userData = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          };
          var token = _helper2.default.generateToken(userData);
          return res.status(200).json({
            message: 'User logged in',
            token: token
          });
        }
        return res.status(401).json({ error: 'Username/Password Incorrect' });
      }).catch(function (error) {
        var errMessages = (0, _handleErrors2.default)(error);
        switch (errMessages.type) {
          case 'validationError':
            res.status(400).json({ error: errMessages.error });
            break;
          default:
            res.status(501).json({ error: errMessages.error });
        }
      });
    }

    /**
     * get one user
     *@static
      *@param {object} req express request object
     *@param {object} res express response object
      *@returns {object} retrieved user object
     */

  }, {
    key: 'getOneUser',
    value: function getOneUser(req, res) {
      return users.findById(req.decoded.id).then(function (user) {
        if (!user) {
          return res.status(400).send({ message: 'User Not Found!' });
        }
        return user.then(res.status(200).json({ message: 'User Found!', user: user }));
      }).catch(function () {
        return res.status(400).send({ message: 'User Not Found!' });
      });
    }
  }]);

  return User;
}();

exports.default = User;
//# sourceMappingURL=userController.js.map