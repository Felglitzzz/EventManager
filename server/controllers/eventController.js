import db from '../models';
/**
 * controller to handle all event based routes
 */
const events = db.event;
/**
 * @class event
 */

export default class Event {
  /**
    * add new event into the database
    *@static
    *@param {object} req express request object
    *@param {object} res express response object
    *@returns {json} json of newly created event
    *@memberof Event
    */
  static addEvent(req, res) {
    return events
      .create(req.body)
      .then(event => res.status(201).json({ Message: 'Event created', Event: event }))
      .catch(error => res.status(400).json({ message: error.message }));
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
    return events
      .findById(req.params.eventId)
      .then((event) => {
        if (!event) {
          return res.status(400).send({ message: 'Event Not Found!' });
        }
        return event
          .destroy()
          .then(res.status(200).json({ message: 'Event Successfully Deleted!' }))
          .catch(error => res.status(409).json({ message: error.message }));
      });
  }
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
      .all()
      .then(event => res.status(200).json({ message: 'Events Found!', Events: event }))
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
    // const {
    //   name, location, capacity, price, facility, type, dateBooked,
    // } = req.body;
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
        /* updating events details
            if no details inputed, defaults to the details the event already have */
          .update({
            name: req.body.name || event.name,
            location: req.body.location || event.location,
            capacity: req.body.capacity || event.capacity,
            userId: req.body.userId || event.userId,
            centerId: req.body.centerId || event.centerId,
          })
          // Send back the updated event too.
          .then(modifiedEvent => res.status(200).json({
            message: 'Event Update Successful', modifiedEvent,
          }))

          .catch(error => res.status(400).json({ message: error.message }));
      })
      .catch(error => res.status(409).json({ message: error.message }));
  }
}
