import jwt from 'jsonwebtoken';
import bcrypt, { hashSync } from 'bcrypt';
import db from '../models';
import errorMessages from '../utils/handleErrors';

require('dotenv').config();

const users = db.user;
const secret = process.env.SECRET;

/**
 * creates class User
 * controller to handle all user based routes
 */
export default class User {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json} json
   */
  static createUser(req, res) {
    // const { username } = req.body;
    // const query = {
    //   where: {
    //     $and: [
    //       { username }
    //     ]
    //   }
    // };
    // users.find(query).then((foundUser) => {
    //   if (foundUser) {
    //     return res.status(409).json({ message: `username ${username} is already taken` });
    //   }
    return users
      .create({
        surname: req.body.surname,
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
      })
      .then((user) => {
        const userData = {
          username: user.username,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign(userData, secret, { expiresIn: '96h' });
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
        switch (errMessages.type) {
        case 'uniqueError':
          res.status(409).json({ error: errMessages.error });
          break;
        case 'validationError':
          res.status(400).json({ error: errMessages.error });
          break;
        default:
          res.status(501).json({ error: errMessages.error });
        }
      });
  }
  /**
   * sign in
   * @param {object} req
   * @param {object} res
   * @returns {json} json
   */
  static login(req, res) {
    const { username, password } = req.body;
    if (!username) {
      res.status(400).json({ message: 'Kindly provide your username' });
    }
    if (!password) {
      res.status(400).json({ message: 'Kindly provide your password' });
    }
    users.findOne({ where: { username } })
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const userData = {
            username: user.username,
            email: user.email,
            id: user.id,
            isAdmin: user.isAdmin
          };
          const token = jwt.sign(userData, secret, { expiresIn: '96h' });
          return res.status(200).json({
            message: 'User logged in',
            token,
            user: {
              userId: user.id,
              username: user.username,
              isAdmin: user.isAdmin
            }
          });
        }
        return res.status(400).json({ message: 'Username/Password Incorrect' });
      })
      .catch(() => res.status(400).json({ message: 'Username/Password Incorrect' }));
  }

  /**
   * get one user
   *@static
   *@param {object} req express request object
   *@param {object} res express response object
   *@returns {void}
   *@memberof Event
   */
  static getOneUser(req, res) {
    return users
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(400).send({ message: 'User Not Found!' });
        }
        return user
          .then(res.status(200).json({ message: 'User Found!', user }));
      });
  }
}
