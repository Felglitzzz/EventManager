import db from '../models';
import errorMessages from '../utils/handleErrors';

const events = db.event;
const centers = db.center;
const reqBody = (req) => {
  const {
    name, date, centerId, image, description
  } = req.body;
  const { id: userId } = req.decoded;
  const time = '12:59';

  return {
    name, date, time, centerId, image, description, userId
  };
};
/**
 * Controller Class implementation to handle event based routes
 * @class Event
 */
export default class Event {
  /**
    *Add new event into the database
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with newly created event and success message
    *
    * @memberof Event
    */
  static addEvent(req, res) {
    const now = new Date();
    const eventDate = req.body.date;
    const date = new Date(eventDate);
    if (date && date < now) {
      return res.status(400).json({ message: 'Date is past, Please choose a future date!' });
    }
    const query = {
      where: {
        $and: [
          { date: req.body.date },
          { centerId: req.body.centerId }
        ]
      }
    };
    events.find(query)
      .then((event) => {
        if (event) {
          return res.status(409).json({ message: `center has already being booked for ${req.body.date}, kindly book another date` });
        }
        return events.create(reqBody(req))
          .then(newEvent => res.status(201).json({ message: 'Event Created!', event: newEvent }))
          .catch((error) => {
            const errMessages = errorMessages(error);
            if (errMessages.type) {
              res.status(501).json({ message: errMessages.error });
            }
          });
      });
  }

  /**
    *Delete selected event
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with event Id and success message
    *
    * @memberof Event
    */
  static deleteEvent(req, res) {
    const { eventId } = req.params;
    return events
      .findById(eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).send({ message: 'Event Not Found!' });
        }
        return event
          .destroy()
          .then(res.status(200).json({ message: 'Event Successfully Deleted!', eventId }));
      });
  }

  /**
    *Get one event from the database
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with one fetched event and success message
    *
    * @memberof Event
    */
  static getOneEvent(req, res) {
    return events
      .findById(req.params.eventId, {
        include: [{
          model: centers,
          as: 'center',
          attributes: ['id', 'name', 'location'],
        }],
      })
      .then((event) => {
        if (!event) {
          return res.status(404).send({ message: 'Event Not Found!' });
        }
        return res.status(200).json({ message: 'Event Found!', event });
      });
  }

  /**
    *Get all events
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with newly created event and success message
    *
    * @memberof Event
    */
  static getAllEvents(req, res) {
    return events
      .findAll({
        where: {
          userId: req.decoded.id
        },
        include: [{
          model: centers,
          attributes: ['id', 'name', 'location'],
        }],
      })
      .then(event => res.status(200).json({ message: 'Events Found!', event }))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  /**
    *Edit selected event
    * @static
    *
    * @param {object} req express request object
    * @param {object} res express response object
    *
    * @returns {object} error message object or object with edited event and success message
    *
    * @memberof Event
    */
  static modifyEvent(req, res) {
    return events
    // finding event whose Id matches the eventId supplied
      .findById(req.params.eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: 'Event Not Found!',
          });
        }
        return event
        /* updating events details */
          .update(reqBody(req))
          // Send back the updated event too.
          .then(modifiedEvent => res.status(200).json({
            message: 'Event Update Successful', modifiedEvent,
          }))
          .catch((error) => {
            const errMessages = errorMessages(error);
            if (errMessages.type) {
              res.status(501).json({ message: errMessages.error });
            }
          });
      });
  }
}
