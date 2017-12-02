// import jwt from 'jsonwebtoken';

// require('dotenv').config();

// const secret = process.env.SECRET;

// /**
//  * @class Helper
//  * creates a helper class
//  *
//  */
// export default class Helper {
//   /**
//      * @static
//      * @param {object} req express request object
//      * @param {object} res express response object
//      * @returns
//      */
//   static generateToken(user) {
//     const token = jwt.sign(user, secret, { expiresIn: '24h' });
//     return token;
//   }

//   /**
//      * @static
//      * @param {object} req express request object
//      * @param {object} res express response object
//      * @returns
//      */
//   static decodeToken(token) {
//     const decodedToken = jwt.verify(token, secret);
//     return decodedToken;
//   }

//   /**
//      * @static
//      * @param {object} req express request object
//      * @param {object} res express response object
//      * @returns
//      */
//   static verifyUser(token) {
//     const decodedToken = jwt.verify(token, secret);
//     return decodedToken;
//   }

//   /**
//      * @static
//      * @param {object} req express request object
//      * @param {object} res express response object
//      * @returns
//      */
//   static checkHeader(header) {
//     if (!header) return false;
//     return true;
//   }
// }
