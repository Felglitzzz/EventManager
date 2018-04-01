import models from '../models';
import Helper from '../utils/helper';


const userModel = models.user;
// const secret = process.env.SECRET;

require('dotenv').config();

/**
 * Ensures all routes are protected
 */
export default class Auth {
/**
   * This methods verifies if a user is a regular user
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {next} next runs the next function
   *
   * @returns {object} validation error message or passes control to the next item
  */
  static verifyUser(req, res, next) {
    console.log('userIdddd', req.params.userId);
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'You do not have permission to access this page' });
    }
    Helper.decodeToken(authorization)
      .then((decoded) => {
        console.log('decodedd', decoded);

        if (!decoded) {
          return res.status(403).json({
            error: 'You do not have the permission to access this page'
          });
        }
        userModel.findOne({ where: { id: decoded.id } })
          .then((user) => {
            if (!user) { return res.status(404).json({ message: 'User not found' }); }
            req.decoded = decoded;
            return next();
          })
          .catch((error) => {
            console.log(error);
            return res.status(404).json({ message: 'User not found' });
          });
      })
      .catch((err) => {
        const { name, message } = err;
        if (name === 'JsonWebTokenError') {
          return res.status(401).json({
            message,
            err: 'Invalid Token!'
          });
        }
        if (name === 'TokenExpiredError') {
          return res.status(401).json({
            message: 'Session Expired!'
          });
        }
        return res.status(403).json({ err });
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
  static checkAdminStatus(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).json({
        message: 'You do not have the permission to access this page!'
      });
    }
    Helper.decodeToken(authorization)
      .then((decoded) => {
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
}

