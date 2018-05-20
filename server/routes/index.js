import express from 'express';
import Event from '../controllers/eventController';
import Center from '../controllers/centerController';
import User from '../controllers/userController';
import Auth from '../middleware/Auth';
import InputValidate from '../middleware/InputValidate';
import Check from '../middleware/Check';

const router = express.Router();

// Center Routes
router
  .get(
    '/centers',
    Center.getAllCenters
  );
router
  .get(
    '/centers/views',
    Center.getUnPaginatedCenters
  );
router
  .get(
    '/centers/:centerId',
    InputValidate.checkCenterId,
    Center.getOneCenter
  );
router
  .put(
    '/centers/:centerId',
    Auth.checkAdminStatus,
    InputValidate.editCenter,
    Center.modifyCenter
  );
router
  .post(
    '/centers',
    Auth.checkAdminStatus,
    InputValidate.addCenter,
    Center.addCenter
  );
router
  .delete(
    '/centers/:centerId',
    Auth.checkAdminStatus,
    InputValidate.checkCenterId,
    Center.deleteCenter
  );

// Event Routes

router
  .get(
    '/events',
    Auth.verifyUser,
    Event.getAllEvents
  );
router
  .post(
    '/events',
    Auth.verifyUser,
    InputValidate.addEvent,
    Check.IfEventNameIsInDatabase,
    Check.IfEventDateIsPast,
    Check.IfCenterIsAlreadyBooked,
    Event.addEvent
  );
router
  .put(
    '/events/:eventId',
    Auth.verifyUser,
    InputValidate.editEvent,
    Check.IfEditEventNameIsInDatabase,
    Check.IfEventDateIsPast,
    Check.IfEditCenterIsAlreadyBooked,
    Event.modifyEvent
  );
router
  .delete(
    '/events/:eventId',
    Auth.verifyUser,
    InputValidate.checkEventId,
    Event.deleteEvent
  );
router
  .get(
    '/events/:eventId',
    Auth.verifyUser,
    InputValidate.checkEventId,
    Event.getOneEvent
  );
router
  .get(
    '/events/center/:centerId',
    Auth.verifyUser,
    InputValidate.checkCenterId,
    Event.getEventsByCenterId
  );
router
  .put(
    '/events/cancel/:eventId',
    Auth.checkAdminStatus,
    InputValidate.checkEventId,
    Event.cancelEvent
  );
router
  .put(
    '/events/approve/:eventId',
    Auth.checkAdminStatus,
    InputValidate.checkEventId,
    Event.approveEvent
  );


// User Routes

router
  .post(
    '/users',
    InputValidate.signUp,
    User.createUser
  );
router
  .post(
    '/users/login',
    InputValidate.login,
    User.login
  );
router
  .get(
    '/users/:userId',
    Auth.verifyUser,
    User.getOneUser
  );

// catch all route
router.get('/home', (req, res) =>
  res.status(200).send({
    message: 'Hi there, Welcome to Eventeria.'
  }));

export default router;
