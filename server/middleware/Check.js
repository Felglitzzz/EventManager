import moment from 'moment';
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
    if (eventStartDate && eventStartDate < now) {
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

    const query = {
      where: {
        centerId: req.body.centerId,
        startDate: {
          $between: [eventStartDate, eventEndDate]
        },
        endDate: {
          $between: [eventStartDate, eventEndDate]
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
      where: {
        centerId: req.body.centerId,
        startDate: {
          $between: [eventStartDate, eventEndDate]
        },
        endDate: {
          $between: [eventStartDate, eventEndDate]
        }
      }
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
