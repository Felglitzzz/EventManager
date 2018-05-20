import nodemailer from 'nodemailer';
import db from '../models';
import errorMessages from '../utils/errorMessages';
import Helper from '../utils/Helper';

require('dotenv').config();

const events = db.event;
const centers = db.center;
const users = db.user;

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
        .then(() => res.status(200).json({ message: 'Event Successfully Deleted!', eventId }))
        .catch(error => res.status(500).json({ message: error }));
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
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
    let currentPage = req.query.page || 1;
    currentPage = Number(currentPage);
    const currentPageUrl = `${baseUrl}?page=${currentPage}`;
    const offset = limit * (currentPage - 1);
    let previous;
    let next;

    return events
      .findAndCountAll({
        where: {
          userId: req.decoded.id
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: centers,
            attributes: ['id', 'name', 'location']
          }
        ]
      })
      .then((foundEvents) => {
        if (foundEvents.count === 0) {
          return res.status(404).send({
            message: 'Event Not Found!'
          });
        }
        const totalPages = Math.ceil(foundEvents.count / limit);
        if (currentPage !== 1) {
          previous = `${baseUrl}?page=${currentPage - 1}`;
        }
        if (totalPages > currentPage) {
          next = `${baseUrl}?page=${currentPage + 1}`;
        }
        return res.status(200).json({
          message: 'Events Found!',
          events: foundEvents,
          meta: {
            pagination: {
              currentPageUrl,
              previous,
              next,
              currentPage,
              totalPages,
              offset,
              limit
            }
          }
        });
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
    let currentPage = req.query.page || 1;
    currentPage = Number(currentPage);
    const currentPageUrl = `${baseUrl}?page=${currentPage}`;
    let previous;
    let next;

    return events
      .findAndCountAll({
        where: {
          centerId: req.params.centerId
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      })
      .then((foundEvents) => {
        if (foundEvents.count === 0) {
          return res.status(404).send({
            message: 'Event Not Found!'
          });
        }
        const totalPages = Math.ceil(foundEvents.count / limit);
        offset = limit * (currentPage - 1);
        if (currentPage !== 1) {
          previous = `${baseUrl}?page=${currentPage - 1}`;
        }
        if (totalPages > currentPage) {
          next = `${baseUrl}?page=${currentPage + 1}`;
        }
        return res.status(200).json({
          message: 'Events Found!',
          events: foundEvents,
          meta: {
            pagination: {
              currentPageUrl,
              previous,
              next,
              currentPage,
              totalPages,
              offset,
              limit
            }
          }
        });
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
              // updating events details //
              .update(Helper.sanitizedEventRequest(req))
              // Send back the updated event too.
              .then(modifiedEvent => res.status(200).json({
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

  /**
   * cancel an event
   * @static
   *
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {object} error message object or object with cancelled event and success message
   *
   * @memberof Event
   */
  static cancelEvent(req, res) {
    const { eventId } = req.params;
    return events
    // finding event whose Id matches the eventId supplied
      .findById(eventId, {
        include: [
          {
            model: centers,
            as: 'center',
            attributes: ['id', 'name']
          },
          {
            model: users,
            as: 'user',
            attributes: ['id', 'surname', 'email']
          }
        ]
      })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: 'Event Not Found!'
          });
        }
        return event
          .update({
            status: 'cancelled'
          })
          .then(() => {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
              }
            });
            const mailOptions = {
              from: '"Eventeria" <eventeria.app@gmail.com>',
              to: event.user.email,
              subject: 'Event Cancelled',
              html: `<p>Hi ${event.user.surname}, 
            <br> We regret to inform you that your <strong>${event.name}</strong> 
            has been cancelled.
            <br>This is due to the inability of you to meet our payment plan for <strong>${event.center.name}</strong> chosen for your event. 
            <br><br>Kind regards, <br><strong>Eventeria</strong></p>`
            };

            transporter.sendMail(mailOptions, (error) => {
              if (error) {
                return res.status(500).send({
                  message: 'An error occured sending mail to user',
                  cancelled: false
                });
              }
              return res.status(200).send({
                message: 'Message sent!',
                cancelled: true,
                eventId
              });
            });
          });
      });
  }


  /**
   * approves an event
   * @static
   *
   * @param {object} req express request object
   * @param {object} res express response object
   *
   * @returns {object} error message object or object with approved event and success message
   *
   * @memberof Event
   */
  static approveEvent(req, res) {
    const { eventId } = req.params;
    return events
    // finding event whose Id matches the eventId supplied
      .findById(eventId, {
        include: [
          {
            model: centers,
            as: 'center',
            attributes: ['id', 'name']
          },
          {
            model: users,
            as: 'user',
            attributes: ['id', 'surname', 'email']
          }
        ]
      })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: 'Event Not Found!'
          });
        }
        return event
          .update({
            status: 'accepted'
          })
          .then(() => {
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
              }
            });
            const mailOptions = {
              from: '"Eventeria" <eventeria.app@gmail.com>', // sender address
              to: event.user.email, // list of receivers
              subject: 'Event Accepted', // Subject line
              html: `<p>Hi ${event.user.surname}, 
            <br> We are glad to inform you that your <strong>${event.name}</strong> 
            has been approved to hold at <strong>${event.center.name}</strong>.
            <br>Thank you for your patronage.
            <br><br>Kind regards, <br><strong>Eventeria</strong></p>` // html body
            };

            transporter.sendMail(mailOptions, (error) => {
              if (error) {
                return res.status(500).send({
                  message: 'An error occured sending mail to user',
                  cancelled: false
                });
              }
              return res.status(200).send({
                message: 'Message sent!',
                approved: true,
                eventId
              });
            });
          });
      });
  }
}
