import jwt from 'jsonwebtoken';

require('dotenv').config();

/**
 * Helper Class implementation to handle JWT methods
 * @class Helper
 */
export default class Helper {
  /**
    * Decodes JWT Token
    * @static
    *
    * @param {string} token - jwt token string
    * @param {object} res express response object
    *
    * @returns {object} decoded payload
    *
    * @memberof Helper
    */
  static decodeToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (decoded) {
          resolve(decoded);
        } else {
          reject(err);
        }
      });
    });
  }

  /**
    * Generates JWT Token
    * @static
    *
    * @param {object} user - user object payload
    *
    * @returns {string} jwt token
    *
    * @memberof Helper
    */
  static generateToken(user) {
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
    return token;
  }
}

