import jwt from 'jsonwebtoken';
import models from '../models';

const userModel = models.user;
const secret = process.env.SECRET;

require('dotenv').config();
/**
 * verifies user
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {function} next
 * @returns {json} json
 */
export default class Auth {
/**
   * verifies user
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {next} next runs the next function
   * @returns {null} no return value
   */
  static verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Only logged in user can perform such action' });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    userModel.findOne({ where: { username: decoded.username, id: decoded.id } })
      .then((user) => {
        if (!user) { return res.status(404).json({ message: 'User not found' }); }
        req.decoded = decoded;
        next();
      });
  }
  /**
   * verifies admin
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {next} next runs the next function
   * @returns {null} no return value
   */
  static checkAdminStatus(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) { return res.status(403).json({ message: 'Failed to authenticate token' }); }
    // if everything is good, save to request for use in other routes
    req.decoded = decoded;

    if (!req.decoded.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized entry!' });
    }
    next();
  }
}

