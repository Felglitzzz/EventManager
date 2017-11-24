// import centers from '../models/center.json';
// /**
//  * @param{req} -request from the user
//  * @param{res} -response from the server
//  * @return{json} -return a json object, indicating success or failure
//  */
// export default class AddCenter {
//   /**
//    * 
//    */
//  static createCenter(req, res) {
//     if (!req.body.center_name && !req.body.center_location && !req.body.center_capacity && !req.body.center_price && !req.body.center_type) {
//       return res.json({
//         message: 'Please fill in appropriate field',
//         error: true
//       });
//     }
//     centers.push(req.body);
//     return res.json({
//       message: 'Center created',
//       error: false
//     });
//   }
// };