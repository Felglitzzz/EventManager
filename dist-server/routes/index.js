'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _eventController = require('../controllers/eventController');

var _eventController2 = _interopRequireDefault(_eventController);

var _centerController = require('../controllers/centerController');

var _centerController2 = _interopRequireDefault(_centerController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _auth = require('../middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _inputValidate = require('../middleware/inputValidate');

var _inputValidate2 = _interopRequireDefault(_inputValidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/centers', _centerController2.default.getAllCenters);
router.get('/centers/:centerId', _centerController2.default.getOneCenter);
router.put('/centers/:centerId', _auth2.default.checkAdminStatus, _inputValidate2.default.editCenter, _centerController2.default.modifyCenter);
router.post('/centers', _auth2.default.checkAdminStatus, _inputValidate2.default.createCenter, _centerController2.default.addCenter);

router.get('/events', _auth2.default.verifyUser, _eventController2.default.getAllEvents);
router.post('/events', _auth2.default.verifyUser, _inputValidate2.default.createEvent, _eventController2.default.addEvent);
router.put('/events/:eventId', _auth2.default.verifyUser, _inputValidate2.default.editEvent, _eventController2.default.modifyEvent);
router.delete('/events/:eventId', _auth2.default.verifyUser, _eventController2.default.deleteEvent);
router.get('/events/:eventId', _auth2.default.verifyUser, _eventController2.default.getOneEvent);

router.post('/users', _inputValidate2.default.signUp, _userController2.default.createUser);
router.post('/users/login', _inputValidate2.default.login, _userController2.default.login);
router.get('/users/:userId', _auth2.default.verifyUser, _userController2.default.getOneUser);

// catch all route
router.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Hi there, Welcome to Event Manager.'
  });
});

exports.default = router;
//# sourceMappingURL=index.js.map