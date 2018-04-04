'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * controller to handle all center based routes
 */
var centers = _models2.default.center;
var events = _models2.default.event;

var reqBody = function reqBody(req) {
  var _req$body = req.body,
      name = _req$body.name,
      location = _req$body.location,
      capacity = _req$body.capacity,
      facilities = _req$body.facilities,
      type = _req$body.type,
      image = _req$body.image,
      description = _req$body.description,
      price = _req$body.price;
  var userId = req.decoded.id;


  return {
    name: name, location: location, capacity: capacity, facilities: facilities, type: type, image: image, description: description, userId: userId, price: price
  };
};
/**
 * @class center
 */

var Center = function () {
  function Center() {
    _classCallCheck(this, Center);
  }

  _createClass(Center, null, [{
    key: 'addCenter',

    /**
      * add new center into the database
      *@static
      *@param {object} req express request object
      *@param {object} res express response object
      *@returns {json} json of newly created center
      *@memberof Center
      */
    value: function addCenter(req, res) {
      return centers.create(reqBody(req)).then(function (center) {
        return res.status(201).json({ message: 'Center created!', Center: center });
      })
      // .catch((error) => {
      //   const errMessages = errorMessages(error);
      //   switch (errMessages.type) {
      //     case 'uniqueError':
      //       res.status(409).json({ error: errMessages.error });
      //       break;
      //     case 'validationError':
      //       res.status(400).json({ error: errMessages.error });
      //       break;
      //     default:
      //       res.status(501).json({ error: errMessages.error });
      //   }
      // });
      .catch(function (error) {
        return res.status(400).json({ message: error.errors[0].message });
      });
    }

    /**
      *edit center
      *@static
      *@param {object} req express request object
      *@param {object} res express response object
      *@returns {json} json with modified center
      *@memberof Center
      */

  }, {
    key: 'modifyCenter',
    value: function modifyCenter(req, res) {
      // const {
      //   name, location, capacity, price, facilities, type, dateBooked,
      // } = req.body;
      return centers
      // finding center whose Id matches the centerId supplied
      .findById(req.params.centerId).then(function (center) {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found!'
          });
        }
        return center
        /* updating centers details
        if no details inputed, defaults to the details the center already have */
        .update(reqBody(req))
        // Send back the updated center too.
        .then(function (modifiedCenter) {
          return res.status(200).json({
            message: 'Center Update Successful', modifiedCenter: modifiedCenter
          });
        }).catch(function (error) {
          return res.status(400).json({ message: error.message });
        });
      });
    }
    /**
      * get one center
      *@static
      *@param {object} req express request object
      *@param {object} res express response object
      *@returns {json} json with one center
      *@memberof Center
      */

  }, {
    key: 'getOneCenter',
    value: function getOneCenter(req, res) {
      return centers.findById(req.params.centerId, {
        include: [{
          model: events,
          as: 'events'
        }]
      }).then(function (center) {
        if (!center) {
          return res.status(404).send({
            message: 'Center Not Found!'
          });
        }
        return res.status(200).json({
          message: 'Center Found',
          center: center
        });
      }).catch(function () {
        return res.status(500).json({
          message: 'Some error occured'
        });
      });
    }
    /**
      *get all centers
      *@static
      *@param {object} req express request object
      *@param {object} res express response object
      *@returns {json} json with all centers
      *@memberof Center
      */

  }, {
    key: 'getAllCenters',
    value: function getAllCenters(req, res) {
      return centers.all().then(function (center) {
        return res.status(200).json({
          message: 'Centers found!', Centers: center
        });
      }).catch(function (error) {
        return res.status(500).json(error);
      });
    }
    // /**
    //  * deletes one center
    //  *@static
    //  *@param {object} req express request object
    //  *@param {object} res express response object
    //  *@returns {void}
    //  *@memberof Center
    //  */

    // static deleteCenter(req, res) {
    //   return centers
    //     .findById(req.params.id)
    //     .then((center) => {
    //       if (!center) {
    //         return res
    //           .status(400)
    //           .send({ message: 'center not Found' });
    //       }
    //       return center
    //         .destroy()
    //         .then(res.status(200).send({ message: 'center successfully deleted!' }))
    //         .catch(error => res.status(409).send(error));
    //     });
    // }

  }]);

  return Center;
}();

exports.default = Center;
//# sourceMappingURL=centerController.js.map