'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _helper = require('../utils/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userModel = _models2.default.user;
// const secret = process.env.SECRET;

require('dotenv').config();

/**
 * Ensures all routes are protected
 */

var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: 'verifyUser',

    /**
       * This methods verifies if a user is a regular user
       *
       * @param {object} req express request object
       * @param {object} res express response object
       * @param {next} next runs the next function
       *
       * @returns {object} validation error message or passes control to the next item
      */
    value: function verifyUser(req, res, next) {
      var authorization = req.headers.authorization;

      if (!authorization) {
        return res.status(401).json({ error: 'You do not have permission to access this page' });
      }
      _helper2.default.decodeToken(authorization).then(function (decoded) {
        if (!decoded) {
          return res.status(403).json({ error: 'You do not have the permission to access this page' });
        }
        userModel.findOne({ where: { id: decoded.id } }).then(function (user) {
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          req.decoded = decoded;
          return next();
        }).catch(function () {
          return res.status(404).json({ message: 'User not found' });
        });
      }).catch(function (err) {
        var name = err.name,
            message = err.message;

        if (name === 'JsonWebTokenError') {
          return res.status(401).json({ message: message, err: 'Invalid Token!' });
        }
        if (name === 'TokenExpiredError') {
          return res.status(401).json({ essage: 'Session Expired!' });
        }
        return res.status(403).json({ err: err });
      });
    }

    /**
     * This method verifies if a user is an admin
     *
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {next} next runs the next function
     *
     * @returns {object} validation error message or passes control to the next item
      */

  }, {
    key: 'checkAdminStatus',
    value: function checkAdminStatus(req, res, next) {
      var authorization = req.headers.authorization;

      if (!authorization) {
        return res.status(403).json({
          message: 'You do not have the permission to access this page!'
        });
      }
      _helper2.default.decodeToken(authorization).then(function (decoded) {
        if (!decoded) {
          return res.status(403).json({
            message: 'Authentication failed, Token is Invalid or expired'
          });
        }
        if (!decoded.isAdmin) {
          return res.status(403).json({
            message: 'You do not have the permission to access this page!'
          });
        }
        req.decoded = decoded;
        return next();
      });
    }
  }]);

  return Auth;
}();

exports.default = Auth;
//# sourceMappingURL=auth.js.map