import models from '../models';
import Helper from '../utils/helper';


const userModel = models.user;
// const secret = process.env.SECRET;

require('dotenv').config();

/**
 * Controller Class implementation to ensure all routes are protected
 * @class Auth
 */
export default class Auth {
  /**
    * This methods verifies if a user is a regular user
    * @static
    *
    * @param {object} req - express request object
    * @param {object} res - express response object
    * @param {object} next - runs the next function
    *
    * @returns {object} validation error message or passes control to the next item
    *
    * @memberof Auth
    */
  static verifyUser(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'You do not have permission to access this page' });
    }
    Helper.decodeToken(authorization)
      .then((decoded) => {
        if (decoded) {
          userModel.findOne({ where: { id: decoded.id } })
            .then((user) => {
              if (user) {
                req.decoded = decoded;
                return next();
              }
            })
            .catch(() => res.status(404).json({ message: 'User not found' }));
        }
      })
      .catch((err) => {
        const { name } = err;
        if (name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid Token/Unauthorised!' });
        }
        if (name === 'TokenExpiredError') {
          return res.status(401).json({ essage: 'Session Expired!' });
        }
        return res.status(403).json({ err });
      });
  }

  /**
    * This methods verifies if a user is an admin
    * @static
    *
    * @param {object} req - express request object
    * @param {object} res - express response object
    * @param {object} next - runs the next function
    *
    * @returns {object} validation error message or passes control to the next item
    *
    * @memberof Auth
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
        if (!decoded.isAdmin) {
          return res.status(403).json({
            message: 'You do not have the permission to access this page!'
          });
        }
        req.decoded = decoded;
        return next();
      })
      .catch((err) => {
        const { name } = err;
        if (name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid Token/Unauthorised!' });
        }
      });
  }
}

