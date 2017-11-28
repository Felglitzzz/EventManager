import db from '../models';
/**
 * controller to handle all center based routes
 */
const centers = db.center;
const events = db.event;
/**
 * @class center
 */

class Center {
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
      .then(center => res.status(201).send({ message: 'Center created', Center: center }))
      .catch(error => res.status(400).send({ message: error.error[0].message }));
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
    const {
      name, location, capacity, price, facility, type, availability,
    } = req.body;
    return centers
      .findById(req.params.centerId)
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found!',
          });
        }
        return center
          .update({
            name: name || center.name,
            location: location || center.location,
            capacity: capacity || center.capacity,
            price: price || center.price,
            facility: facility || center.facility,
            type: type || center.type,
            availability: availability || center.availability,
          })
          .then(modifiedCenter => res.status(200).json({
            message: 'Center Update Successful', modifiedCenter,
          })) // Send back the updated center too.
          .catch(error => res.status(400).json({ message: error.errors[0].message }));
      })
      .catch(error => res.status(400).json({ message: error.errors[0].message }));
  }
  /**
    * get one center
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json with one center
    *@memberof Center
    */
    static modifyCenter(req, res) {
        
}

