import db from '../models';
/**
 * controller to handle all center based routes
 */
const centers = db.center;
const events = db.event;
/**
 * @class center
 */
export default class Center {
  /**
    * add new center into the database
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json of newly created center
    *@memberof Center
    */
  static addCenter(req, res) {
    return centers
      .create(req.body)
      .then(center => res.status(201).json({ message: 'Center created!', Center: center }))
      .catch(error => res.status(400).json({ message: error.errors[0].message }));
  }

  /**
    *edit center
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json with modified center
    *@memberof Center
    */
  static modifyCenter(req, res) {
    // const {
    //   name, location, capacity, price, facility, type, dateBooked,
    // } = req.body;
    return centers
    // finding center whose Id matches the centerId supplied
      .findById(req.params.centerId)
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found!',
          });
        }
        return center
        /* updating centers details
        if no details inputed, defaults to the details the center already have */
          .update({
            name: req.body.name,
            location: req.body.location,
            capacity: req.body.capacity,
            price: req.body.price,
            facility: req.body.facility,
            type: req.body.type,
            dateBooked: req.body.dateBooked,
          })
        // Send back the updated center too.
          .then(modifiedCenter => res.status(200).json({
            message: 'Center Update Successful', modifiedCenter,
          }))
          .catch(error => res.status(400).json({ message: error.message }));
      });
  }
  /**
    * get one center
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json with one center
    *@memberof Center
    */
  static getOneCenter(req, res) {
    return centers
      .findById(req.params.centerId, {
        include: [{
          model: events,
          as: 'events',
        }],
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found!',
          });
        }
        return res.status(200).json({
          message: 'Center Found',
          center,
        });
      })
      .catch(() => res.status(500).json({
        message: 'Some error occured',
      }));
  }
  /**
    *get all centers
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json with all centers
    *@memberof Center
    */
  static getAllCenters(req, res) {
    return centers
      .all()
      .then(center => res.status(200).json({
        message: 'Centers found!', Centers: center,
      }))
      .catch(error => res.status(500).json(error));
  }
  // /**
  //  * deletes one center
  //  *@static
  //  *@param {object} req express request object
  //  *@param {object} res express response object
  //  *@returns {void}
  //  *@memberof Center
  //  */

  // static deleteCenter(req, res) {
  //   return centers
  //     .findById(req.params.id)
  //     .then((center) => {
  //       if (!center) {
  //         return res
  //           .status(400)
  //           .send({ message: 'center not Found' });
  //       }
  //       return center
  //         .destroy()
  //         .then(res.status(200).send({ message: 'center successfully deleted!' }))
  //         .catch(error => res.status(409).send(error));
  //     });
  // }
}
