import db from '../models';
import errorMessages from '../utils/errorMessages';
import Helper from '../utils/Helper';

const events = db.event;
const centers = db.center;

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
    return events
      .create(Helper.sanitizedEventRequest(req))
      .then(newEvent => res.status(201).json({ message: 'Event Created!', event: newEvent }))
      .catch((error) => {
        const errMessages = errorMessages(error);
        if (errMessages.type) {
          res.status(501).json({ message: errMessages.error });
        }
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
    return events.findById(eventId).then((event) => {
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
        include: [
          {
            model: centers,
            as: 'center',
            attributes: ['id', 'name', 'location']
          }
        ]
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
   * @returns {object} error message object or object with all fetched events and success message
   *
   * @memberof Event
   */
  static getAllEvents(req, res) {
    const limit = 3;
    let offset = Number(0);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    let { page } = req.query;
    page = Number(page);
    const currentPage = `${baseUrl}?page=${page}`;
    let previous;
    let next;

    return events
      .findAndCountAll()
      .then((foundEvents) => {
        if (foundEvents.count === 0) {
          return res.status(404).send({
            message: 'Event Not Found!'
          });
        }
        const pages = Math.ceil(foundEvents.count / limit);
        offset = limit * (page - 1);
        if (page !== 1) {
          previous = `${baseUrl}?page=${page - 1}`;
        }
        if (pages > page) {
          next = `${baseUrl}?page=${page + 1}`;
        }
        events.findAll({
          where: {
            userId: req.decoded.id
          },
          limit,
          offset,
          include: [
            {
              model: centers,
              attributes: ['id', 'name', 'location']
            }
          ]
        })
          .then(event => res.status(200).json({
            message: 'Events Found!',
            event,
            currentPage,
            previous,
            next,
            page,
            pages
          }));
      })
      .catch(error => res.status(500).json({ message: error.message }));
  }

  /**
   *Get all events in a center
   * @static
   *
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {object} error message object or object with newly created event and success message
   *
   * @memberof Event
   */
  static getEventsByCenterId(req, res) {
    const limit = 3;
    let offset = Number(0);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    let { page } = req.query;
    page = Number(page);
    const currentPage = `${baseUrl}?page=${page}`;
    let previous;
    let next;

    return events
      .findAndCountAll({
        where: {
          centerId: req.params.centerId
        },
      })
      .then((foundEvents) => {
        if (foundEvents.count === 0) {
          return res.status(404).send({
            message: 'Event Not Found!'
          });
        }
        const pages = Math.ceil(foundEvents.count / limit);
        offset = limit * (page - 1);
        if (page !== 1) {
          previous = `${baseUrl}?page=${page - 1}`;
        }
        if (pages > page) {
          next = `${baseUrl}?page=${page + 1}`;
        }
        return events.findAll({
          where: {
            centerId: req.params.centerId
          },
          limit,
          offset,
        })
          .then(event => res.status(200).json({
            message: 'Events Found!',
            event,
            currentPage,
            previous,
            next,
            page,
            pages
          }));
      })
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
    return (
      events
        // finding event whose Id matches the eventId supplied
        .findById(req.params.eventId)
        .then((event) => {
          if (!event) {
            return res.status(404).send({
              message: 'Event Not Found!'
            });
          }
          return (
            event
              /* updating events details */
              .update(Helper.sanitizedEventRequest(req))
              // Send back the updated event too.
              .then(modifiedEvent =>
                res.status(200).json({
                  message: 'Event Update Successful',
                  modifiedEvent
                }))
              .catch((error) => {
                const errMessages = errorMessages(error);
                if (errMessages.type) {
                  res.status(501).json({ message: errMessages.error });
                }
              })
          );
        })
    );
  }
}
