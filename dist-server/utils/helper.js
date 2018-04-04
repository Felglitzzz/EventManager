'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

/**
 * creates an Helper class which is used as a middleware
 */

var Helper = function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: 'decodeToken',

    /**
       * Decodes a token
       *
       * @param {object} token
       *
       * @returns {object} decoded token
       */
    value: function decodeToken(token) {
      return new Promise(function (resolve, reject) {
        _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, decoded) {
          if (decoded) {
            resolve(decoded);
          } else {
            reject(err);
          }
        });
      });
    }
    /**
     * Generates a token
     *
     * @static
     *
     * @param {object} user
     *
     * @returns {string} generated token
     * @memberof Helper
     */

  }, {
    key: 'generateToken',
    value: function generateToken(user) {
      var token = _jsonwebtoken2.default.sign(user, process.env.SECRET, { expiresIn: '24h' });
      return token;
    }
  }]);

  return Helper;
}();

exports.default = Helper;
//# sourceMappingURL=helper.js.map