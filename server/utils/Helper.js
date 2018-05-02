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

  /**
   *  Sanitizes the event request body object
   * @static
   *
   * @param {object} requestData - user object payload
   *
   * @returns {object} sanitized request object
   *
   * @memberof Helper
   */
  static sanitizedEventRequest(requestData) {
    const { centerId, image } = requestData.body;
    const { id: userId } = requestData.decoded;
    const name = requestData.body.name.trim();
    const description = requestData.body.description.trim();
    const startDate = requestData.body.startDate.trim();
    const endDate = requestData.body.endDate.trim();
    return {
      name,
      startDate,
      endDate,
      centerId,
      image,
      description,
      userId
    };
  }

  /**
   *  Sanitizes the center request body object
   * @static
   *
   * @param {object} requestData - user object payload
   *
   * @returns {object} sanitized request object
   *
   * @memberof Helper
   */
  static sanitizedCenterRequest(requestData) {
    const {
      facilities, image, capacity, price
    } = requestData.body;
    const { id: userId } = requestData.decoded;
    const name = requestData.body.name.trim();
    const type = requestData.body.type.trim();
    const description = requestData.body.description.trim();
    const location = requestData.body.location.trim();

    return {
      name,
      location,
      capacity,
      facilities,
      type,
      image,
      description,
      userId,
      price
    };
  }
}
