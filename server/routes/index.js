import express from 'express';
import Event from '../controllers/eventController';
import Center from '../controllers/centerController';
import User from '../controllers/userController';
import Auth from '../middleware/auth';
import Validate from '../middleware/inputValidate';

const router = express.Router();

router.get('/centers', Center.getAllCenters);
router.get('/centers/:centerId', Validate.checkCenterId, Center.getOneCenter);
router.put('/centers/:centerId', Auth.checkAdminStatus, Validate.editCenter, Center.modifyCenter);
router.post('/centers', Auth.checkAdminStatus, Validate.createCenter, Center.addCenter);
router.delete('/centers/:centerId', Auth.checkAdminStatus, Validate.checkCenterId, Center.deleteCenter);

router.get('/events', Auth.verifyUser, Event.getAllEvents);
router.post('/events', Validate.createEvent, Auth.verifyUser, Event.addEvent);
router.put('/events/:eventId', Auth.verifyUser, Validate.editEvent, Event.modifyEvent);
router.delete('/events/:eventId', Auth.verifyUser, Validate.checkEventId, Event.deleteEvent);
router.get('/events/:eventId', Auth.verifyUser, Validate.checkEventId, Event.getOneEvent);

router.post('/users', Validate.signUp, User.createUser);
router.post('/users/login', Validate.login, User.login);
router.get('/users/:userId', Auth.verifyUser, User.getOneUser);

// catch all route
router.get('/', (req, res) =>
  res.status(200).send({
    message: 'Hi there, Welcome to Event Manager.',
  }));


export default router;
