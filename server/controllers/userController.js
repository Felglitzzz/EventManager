import jwt from 'jsonwebtoken';
import bcrypt, { hashSync } from 'bcrypt';
import db from '../models';
import Helper from '../utils/helper';

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
    return users
      .create({
        surname: req.body.username,
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
      })
      .then((user) => {
        console.log(user);
        const userData = {
          username: user.username,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign(userData, secret, { expiresIn: '96h' });
        //     return token;
        res.status(201).json({ message: 'User created', token });
      })
      .catch(() => res.status(400).send({ message: 'Kindly fill the required fields' }));
  }
  /**
   * sign in
   * @param {object} req
   * @param {object} res
   * @returns {json} json
   */
  static login(req, res) {
    const { username } = req.body;
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
          return res.status(200).json({ message: 'User logged in', token });
        }
        return res.status(400).json({ message: 'Username/Password Incorrect' });
      });
  }
}
