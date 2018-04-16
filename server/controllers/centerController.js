import db from '../models';
import errorMessages from '../utils/handleErrors';


const centers = db.center;
const events = db.event;

const reqBody = (req) => {
  const {
    name, location, capacity, facilities, type, image, description, price
  } = req.body;
  const { id: userId } = req.decoded;
  return {
    name, location, capacity, facilities, type, image, description, userId, price
  };
};

/**
 * Controller Class implementation to handle center based routes
 * @class Center
 */
export default class Center {
  /**
    *Add new center into the database
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with newly created center and success message
    *
    * @memberof Center
    */
  static addCenter(req, res) {
    return centers
      .create(reqBody(req))
      .then(center => res.status(201).json({ message: 'Center created!', Center: center }))
      .catch((error) => {
        const errMessages = errorMessages(error);
        if (errMessages.type) {
          return res.status(501).json({ message: errMessages.error });
        }
      });
  }

  /**
    *Edit center into the database
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message or object with newly modified center and success message
    *
    * @memberof Center
    */
  static modifyCenter(req, res) {
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
          .update(reqBody(req))
          .then(modifiedCenter => res.status(200).json({
            message: 'Center Update Successful', modifiedCenter,
          }))
          .catch(error => res.status(500).json({ message: error }));
      });
  }

  /**
    *Get one center
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with found center and success message
    *
    * @memberof Center
    */
  static getOneCenter(req, res) {
    return centers
      .findById(req.params.centerId, {
        include: [{
          model: events,
          as: 'events',
          attributes: ['id', 'name', 'date', 'time']
        }],
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found!',
          });
        }
        return res.status(200).json({
          message: 'Center Found!',
          center,
        });
      })
      .catch(() => res.status(500).json({
        message: 'Internal Server Error!',
      }));
  }

  /**
    *Get all centers from the database
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with all centers and success message
    *
    * @memberof Center
    */
  static getAllCenters(req, res) {
    return centers
      .all()
      .then(center => res.status(200).json({
        message: 'Centers found!', Centers: center,
      }))
      .catch(error => res.status(500).json({ message: error }));
  }

  /**
    *Delete selected center
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with deleted center Id and success message
    *
    * @memberof Center
    */
  static deleteCenter(req, res) {
    const { centerId } = req.params;
    return centers
      .findById(req.params.centerId)
      .then((center) => {
        if (!center) {
          return res
            .status(404)
            .json({ message: 'Center Not Found!' });
        }
        return center
          .destroy()
          .then(res.status(200).json({ message: 'Center Successfully Deleted!', centerId }))
          .catch(error => res.status(500).json({ message: error }));
      });
  }
}
