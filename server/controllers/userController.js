// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../models';
import errorMessages from '../utils/handleErrors';
import Helper from '../utils/helper';

require('dotenv').config();

const users = db.user;
// const secret = process.env.SECRET;

/**
 * This method handles all user based routes
 */
export default class User {
  /**
   * @static
   * @param {object} req object
   * @param {object} res object
   *
   * @returns {object} created User object
   */
  static createUser(req, res) {
    users
      .create({
        surname: req.body.surname,
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      })
      .then((user) => {
        const userData = {
          id: user.id,
        };
        const token = Helper.generateToken(userData);
        res.status(201).json({
          message: 'User created',
          token,
          user: {
            userId: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          }
        });
      })
      .catch((error) => {
        const errMessages = errorMessages(error);
        if (errMessages.type === 'validationError') {
          return res.status(400).json({ error: errMessages.error });
        }
        if (errMessages.type === 'uniqueError') {
          return res.status(409).json({ error: errMessages.error });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
      });
  }
  /**
   * login
   *
   * @param {object} req object
   * @param {object} res object
   *
   * @returns {json} logged in user object
   */
  static login(req, res) {
    const { username, password } = req.body;

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
        return res.status(401).json({ error: 'Username/Password Incorrect' });
      })
      .catch((error) => {
        const errMessages = errorMessages(error);
        switch (errMessages.type) {
        case 'validationError':
          res.status(400).json({ error: errMessages.error });
          break;
        default:
          res.status(501).json({ error: errMessages.error });
        }
      });
  }

  /**
   * get one user
   *@static

   *@param {object} req express request object
   *@param {object} res express response object

   *@returns {object} retrieved user object
   */
  static getOneUser(req, res) {
    return users
      .findById(req.decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(400).send({ message: 'User Not Found!' });
        }
        return user
          .then(res.status(200).json({ message: 'User Found!', user }));
      })
      .catch(() => res.status(400).send({ message: 'User Not Found!' }));
  }
}
