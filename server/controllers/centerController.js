import db from '../models';
import errorMessages from '../utils/errorMessages';
import Helper from '../utils/Helper';

const centers = db.center;
const events = db.event;

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
      .create(Helper.sanitizedCenterRequest(req))
      .then(center => res.status(201).json({ message: 'Center created!', Center: center }))
      .catch((error) => {
        const errMessages = errorMessages(error);
        if (errMessages.type === 'uniqueError') {
          res.status(409).json({ message: errMessages.error });
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
    return (
      centers
        // finding center whose Id matches the centerId supplied
        .findById(req.params.centerId)
        .then((center) => {
          if (!center) {
            return res.status(404).send({
              message: 'Center Not Found!'
            });
          }
          return center
            .update(Helper.sanitizedCenterRequest(req))
            .then(modifiedCenter =>
              res.status(200).json({
                message: 'Center Update Successful',
                modifiedCenter
              }))
            .catch((error) => {
              const errMessages = errorMessages(error);
              if (errMessages.type === 'uniqueError') {
                res.status(409).json({ message: errMessages.error });
              }
            });
        })
    );
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
        include: [
          {
            model: events,
            as: 'events',
            attributes: ['id', 'name', 'startDate', 'endDate']
          }
        ]
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found!'
          });
        }
        return res.status(200).json({
          message: 'Center Found!',
          center
        });
      })
      .catch(() =>
        res.status(500).json({
          message: 'Internal Server Error!'
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
    const limit = 3;
    let offset = Number(0);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    let { page } = req.query;
    page = Number(page);
    const currentPage = `${baseUrl}?page=${page}`;
    let previous;
    let next;

    return centers
      .findAndCountAll()
      .then((foundCenters) => {
        if (foundCenters.count === 0) {
          return res.status(404).send({
            message: 'Center Not Found!'
          });
        }
        const pages = Math.ceil(foundCenters.count / limit);
        offset = limit * (page - 1);
        if (page !== 1) {
          previous = `${baseUrl}?page=${page - 1}`;
        }
        if (pages > page) {
          next = `${baseUrl}?page=${page + 1}`;
        }
        centers.findAll({
          limit,
          offset
        })
          .then(center =>
            res.status(200).json({
              message: 'Centers Found!',
              Centers: center,
              currentPage,
              previous,
              next,
              page,
              pages
            }))
          .catch(error => res.status(500).json({ message: error }));
      });
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
    return centers.findById(req.params.centerId).then((center) => {
      if (!center) {
        return res.status(404).json({ message: 'Center Not Found!' });
      }
      return center
        .destroy()
        .then(res.status(200).json({ message: 'Center Successfully Deleted!', centerId }))
        .catch(error => res.status(500).json({ message: error }));
    });
  }
}
