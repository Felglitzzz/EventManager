import bcrypt from 'bcrypt';

import db from '../models';
import errorMessages from '../utils/errorMessages';
import Helper from '../utils/Helper';

require('dotenv').config();

const users = db.user;

/**
 * Controller Class implementation to handle user based routes
 * @class User
 */
export default class User {
  /**
    *Add new user
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with newly created user and success message
    *
    * @memberof User
    */
  static createUser(req, res) {
    users
      .create(Helper.sanitizedUserRequest(req))
      .then((user) => {
        const userData = {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin
        };
        const token = Helper.generateToken(userData);
        res.status(201).json({
          message: 'User created',
          token,
        });
      })
      .catch((error) => {
        const errMessages = errorMessages(error);
        if (errMessages.type === 'uniqueError') {
          return res.status(409).json({ message: errMessages.error });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  }

  /**
    *Login user
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with user's login details and success message
    *
    * @memberof User
    */
  static login(req, res) {
    const { password } = req.body;
    const username = req.body.username.trim();
    return users.findOne({ where: { username } })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const userData = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          };
          const token = Helper.generateToken(userData);
          return res.status(200).json({
            message: 'User logged in',
            token,
          });
        }
        return res.status(401).json({ message: 'Username/Password Incorrect' });
      })
      .catch((error) => {
        const errMessages = errorMessages(error);
        if (errMessages.type) {
          res.status(501).json({ message: errMessages.error });
        }
      });
  }

  /**
    *Get one user
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with the fetched user and success message
    *
    * @memberof User
    */
  static getOneUser(req, res) {
    return users
      .findById(req.decoded.id)
      .then(user => user
        .then(res.status(200).json({ message: 'User Found!', user })))
      .catch(() => res.status(404).send({ message: 'User Not Found!' }));
  }
}
