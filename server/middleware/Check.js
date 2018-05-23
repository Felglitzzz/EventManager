import moment from 'moment';
import Sequelize from 'sequelize';

import models from '../models';

const events = models.event;

/**
 * Controller Class implementation to check request parameters
 * @class Check
 */
export default class Check {
  /**
   * This middleware checks if event date is past
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next - runs the next function
   *
   * @returns {object} conflict error messages object or content of request body object
   * @memberof Check
   */
  static IfEventDateIsPast(req, res, next) {
    const eventStartDate = new Date(req.body.startDate);
    const now = new Date();
    if (Math.sign(moment(eventStartDate).diff(now, 'days')) === -1) {
      return res.status(400).json({
        message: 'Date is past, Please choose a future date!'
      });
    }
    return next();
  }
  /**
   * This middleware checks if center is already booked
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next - runs the next function
   *
   * @returns {object} conflict error messages object or content of request body object
   * @memberof Check
   */
  static IfCenterIsAlreadyBooked(req, res, next) {
    const eventStartDate = new Date(req.body.startDate);
    const eventEndDate = new Date(req.body.endDate);

    if (eventEndDate < eventStartDate) {
      return res.status(400).send({
        message: 'End date should come after start date'
      });
    }
    const query = {
      where: {
        centerId: req.body.centerId,
        $or: {
          startDate: {
            $between: [eventStartDate, eventEndDate]
          },
          endDate: {
            $between: [eventStartDate, eventEndDate]
          }
        }
      }
    };

    events.find(query).then((event) => {
      if (event) {
        return res.status(409).json({
          message: `This center has already being booked from ${moment(event.startDate).format('LL')} to ${moment(event.endDate).format('LL')}, kindly book another date`
        });
      }
      return next();
    });
  }
  /**
   * This middleware checks if event name is in the database
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next - runs the next function
   *
   * @returns {object} conflict error messages object or content of request body object
   * @memberof Check
   */
  static IfEventNameIsInDatabase(req, res, next) {
    const query = {
      where: {
        $and: [{ name: req.body.name.trim() }, { userId: req.decoded.id }]
      }
    };
    events.find(query).then((event) => {
      if (event) {
        return res.status(409).json({
          message: `You have already created an event with the name '${req.body.name.trim()}'`
        });
      }
      return next();
    });
  }

  /**
   * This middleware checks if center is already booked
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next - runs the next function
   *
   * @returns {object} conflict error messages object or content of request body object
   * @memberof Check
   */
  static IfEditCenterIsAlreadyBooked(req, res, next) {
    const eventStartDate = new Date(req.body.startDate);
    const eventEndDate = new Date(req.body.endDate);

    const query = {
      [Sequelize.Op.or]: [
        {
          startDate: {
            [Sequelize.Op.between]: [eventStartDate, eventEndDate]
          }
        }, {
          endDate: {
            [Sequelize.Op.between]: [eventStartDate, eventEndDate]
          }
        }, {
          startDate: {
            [Sequelize.Op.lte]: eventStartDate
          },
          endDate: {
            [Sequelize.Op.gte]: eventEndDate
          }
        }
      ]
    };

    events.find(query).then((event) => {
      if (event && event.id !== parseInt(req.params.eventId, 10)) {
        return res.status(409).json({
          message: `This center has already being booked from ${moment(event.startDate).format('LL')} to ${moment(event.endDate).format('LL')}, kindly book another date`
        });
      }
      return next();
    });
  }
  /**
   * This middleware checks if event name is in the database
   * @static
   *
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next - runs the next function
   *
   * @returns {object} conflict error messages object or content of request body object
   * @memberof Check
   */
  static IfEditEventNameIsInDatabase(req, res, next) {
    const query = {
      where: {
        $and: [{ name: req.body.name.trim() }, { userId: req.decoded.id }]
      }
    };
    events.find(query).then((event) => {
      if (event && event.id !== parseInt(req.params.eventId, 10)) {
        return res.status(409).json({
          message: `You have already created an event with the name '${req.body.name.trim()}'`
        });
      }
      return next();
    });
  }
}
