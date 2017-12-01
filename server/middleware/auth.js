import jwt from 'jsonwebtoken';
import models from '../models';

const secret = process.env.SECRET;
const userModel = models.user;

require('dotenv').config();
/**
 * verifies user
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {next} next
 * @returns {json} json
 */
export default class Auth {
/**
   * verifies user
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {next} next
   * @returns {json} json
   */
  static verifyUser(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) { return res.status(403).json({ message: 'Failed to authenticate token' }); }
    req.decoded = decoded;
    next();
  }
  /**
   * verifies admin
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {next} next
   * @returns {json} json
   */
  static checkAdminStatus(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
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

