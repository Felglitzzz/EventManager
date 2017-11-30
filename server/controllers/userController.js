import jwt from 'jsonwebtoken';
import bcrypt, { hashSync } from 'bcrypt';
import db from '../models';
import Helper from '../utils/helper';

require('dotenv').config();

const users = db.user;
const secret = process.env.SECRET;
/**
 * @class User
 * controller to handle all user based routes
 */
export default class User {
  /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json}
   */

  static createUser(req, res) {
    console.log(hashSync(req.body.password, 5));
    return users
      .create({
        surname: req.body.username,
        firstname: req.body.firstname,
        username: req.body.username,
        email: req.body.email,
        password: hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
      })
      .then((createduser) => {
        // console.log(createduser);
        const userData = {
          username: createduser.username,
          email: createduser.email,
          userId: createduser.dataValues.id,
          isAdmin: createduser.dataValues.isAdmin,
        };
        const token = jwt.sign(userData, secret, { expiresIn: '24h' });
        //     return token;
        res.status(201).json({ message: 'User created', token });
      })
      .catch(error => res.status(501).send({ message: error.message }));
  }


  /**
   * sign in
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json}
   */
  static login(req, res) {
    const { username, password } = req.body;
    users.findOne({ where: { username } })
      .then((user) => {
        console.log(user);
        if (user && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
          const userData = {
            username: user.username,
            email: user.email,
            userId: user.dataValues.id,
            isAdmin: user.dataValues.isAdmin,
          };
          const token = jwt.sign(userData, secret, { expiresIn: '24h' });
          return res.status(200).json({ message: 'User logged in', token });
        }
        return res.status(401).json({ message: 'Authentication failed!' });
      });
  }
}
