import db from '../models';
import errorMessages from '../utils/handleErrors';

const events = db.event;
const centers = db.center;
const reqBody = (req) => {
  const {
    name, date, time, centerId, image, description
  } = req.body;
  const { id: userId } = req.decoded;

  return {
    name, date, time, centerId, image, description, userId
  };
};
/**
 * handles all center-based routes
 */
export default class Event {
  /**
    * add new event into the database
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json of newly created event
    *@memberof Event
    */
  static addEvent(req, res) {
    const now = new Date();
    const eventDate = req.body.date;
    const date = new Date(eventDate);
    if (date && date < now) {
      return res.status(400).json({ message: 'Date is past, Please choose a future date' });
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
            switch (errMessages.type) {
            case 'uniqueError':
              res.status(409).json({ message: errMessages.error });
              break;
            case 'validationError':
              res.status(400).json({ message: errMessages.error });
              break;
            default:
              res.status(501).json({ message: errMessages.error });
            }
          });
      });
    // .catch(() => res.status(400).json({ error: 'Kindly fill the required fields' }));
    // });
  }
  /**
   * deletes one event
   *@static
   *@param {object} req express request object
   *@param {object} res express response object
   *@returns {void}
   *@memberof Event
   */
  static deleteEvent(req, res) {
    const { eventId } = req.params;
    return events
      .findById(eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).send({ error: 'Event Not Found!' });
        }
        return event
          .destroy()
          .then(res.status(200).json({ error: 'Event Successfully Deleted!', eventId }));
      });
  }

  /**
   * get one event
   *@static
   *@param {object} req express request object
   *@param {object} res express response object
   *@returns {void}
   *@memberof Event
   */
  static getOneEvent(req, res) {
    return events
      .findById(req.params.eventId, {
        include: [{
          model: centers,
          as: 'center'
        }],
      })
      .then((event) => {
        if (!event) {
          return res.status(400).send({ message: 'Event Not Found!' });
        }
        return event
          .then(res.status(200).json({ message: 'Event Found!' }));
      });
  }
  /**
  /**
    * get all events in the database
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json of all events
    *@memberof Event
    */
  static getAllEvents(req, res) {
    return events
      .findAll({
        where: {
          userId: req.decoded.id
        },
        include: [{
          model: centers,
        }],
      })
      .then(event => res.status(200).json({ message: 'Events Founded!', event }))
      .catch(error => res.status(500).json({ message: error.message }));
  }

  /**
    *edit event
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json with modified event
    *@memberof event
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
            if (error.name === 'SequelizeValidationError'
            &&
            errMessages.type === 'validationError') {
              res.status(400).json({ message: errMessages.error });
            } else {
              res.status(501).json({ message: errMessages.error });
            }
          });
      });
  }
}
