import jwt from 'jsonwebtoken';

require('dotenv').config();

/**
 * creates an Helper class which is used as a middleware
 */
export default class Helper {
  /**
     * Decodes a token
     *
     * @param {object} token
     *
     * @returns {object} decoded token
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
   * Generates a token
   *
   * @static
   *
   * @param {object} user
   *
   * @returns {string} generated token
   * @memberof Helper
   */
  static generateToken(user) {
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' });
    return token;
  }
}

