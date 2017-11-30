import jwt from 'jsonwebtoken';
import models from '../models';

const secret = process.env.SECRET;
const userModel = models.user;

require('dotenv').config();

/**
 * @class Helper
 * creates a helper class
 *
 */
export default class Auth {
  /**
     * @static
     * @param {object} req express request object
     * @param {object} res sexpress response object
     * @returns
     */
  static verifyUser(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) { return res.status(403).json({ message: 'Failed to authenticate token' }); }
    // if everything is good, save to request for use in other routes
    req.decoded = decoded;
    console.log(req.decoded);
    next();
  }
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

