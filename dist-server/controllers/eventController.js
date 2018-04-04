'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _handleErrors = require('../utils/handleErrors');

var _handleErrors2 = _interopRequireDefault(_handleErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var events = _models2.default.event;
var centers = _models2.default.center;
var reqBody = function reqBody(req) {
  var _req$body = req.body,
      name = _req$body.name,
      date = _req$body.date,
      time = _req$body.time,
      centerId = _req$body.centerId,
      image = _req$body.image,
      description = _req$body.description;
  var userId = req.decoded.id;


  return {
    name: name, date: date, time: time, centerId: centerId, image: image, description: description, userId: userId
  };
};
/**
 * handles all center-based routes
 */

var Event = function () {
  function Event() {
    _classCallCheck(this, Event);
  }

  _createClass(Event, null, [{
    key: 'addEvent',

    /**
      * add new event into the database
      *@param {object} req express request object
      *@param {object} res express response object
      *@returns {json} json of newly created event
      *@memberof Event
      */
    value: function addEvent(req, res) {
      var now = new Date();
      var eventDate = req.body.date;
      var date = new Date(eventDate);
      if (date && date < now) {
        return res.status(400).json({ message: 'Date is past, Please choose a future date' });
      }
      var query = {
        where: {
          $and: [{ date: req.body.date }, { centerId: req.body.centerId }]
        }
      };
      events.find(query).then(function (event) {
        if (event) {
          return res.status(409).json({ message: 'center has already being booked for ' + req.body.date + ', kindly book another date' });
        }
        return events.create(reqBody(req)).then(function (newEvent) {
          return res.status(201).json({ message: 'Event Created!', event: newEvent });
        }).catch(function (error) {
          var errMessages = (0, _handleErrors2.default)(error);
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

  }, {
    key: 'deleteEvent',
    value: function deleteEvent(req, res) {
      var eventId = req.params.eventId;

      return events.findById(eventId).then(function (event) {
        if (!event) {
          return res.status(404).send({ error: 'Event Not Found!' });
        }
        return event.destroy().then(res.status(200).json({ error: 'Event Successfully Deleted!', eventId: eventId }));
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

  }, {
    key: 'getOneEvent',
    value: function getOneEvent(req, res) {
      return events.findById(req.params.eventId, {
        include: [{
          model: centers,
          as: 'center'
        }]
      }).then(function (event) {
        if (!event) {
          return res.status(400).send({ message: 'Event Not Found!' });
        }
        return event.then(res.status(200).json({ message: 'Event Found!' }));
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

  }, {
    key: 'getAllEvents',
    value: function getAllEvents(req, res) {
      return events.findAll({
        where: {
          userId: req.decoded.id
        },
        include: [{
          model: centers
        }]
      }).then(function (event) {
        return res.status(200).json({ message: 'Events Founded!', event: event });
      }).catch(function (error) {
        return res.status(500).json({ message: error.message });
      });
    }

    /**
      *edit event
      *@static
      *@param {object} req express request object
      *@param {object} res express response object
      *@returns {json} json with modified event
      *@memberof event
      */

  }, {
    key: 'modifyEvent',
    value: function modifyEvent(req, res) {
      return events
      // finding event whose Id matches the eventId supplied
      .findById(req.params.eventId).then(function (event) {
        if (!event) {
          return res.status(404).send({
            message: 'Event Not Found!'
          });
        }
        return event
        /* updating events details */
        .update(reqBody(req))
        // Send back the updated event too.
        .then(function (modifiedEvent) {
          return res.status(200).json({
            message: 'Event Update Successful', modifiedEvent: modifiedEvent
          });
        }).catch(function (error) {
          var errMessages = (0, _handleErrors2.default)(error);
          if (error.name === 'SequelizeValidationError' && errMessages.type === 'validationError') {
            res.status(400).json({ message: errMessages.error });
          } else {
            res.status(501).json({ message: errMessages.error });
          }
        });
      });
    }
  }]);

  return Event;
}();

exports.default = Event;
//# sourceMappingURL=eventController.js.map