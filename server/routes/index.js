import express from 'express';
import Event from '../controllers/eventController';
import Center from '../controllers/centerController';
import User from '../controllers/userController';
import Auth from '../middleware/auth';
import Validate from '../middleware/validator';

const router = express.Router();

router.get('/centers', Center.getAllCenters);
router.get('/centers/:centerId', Center.getOneCenter);
router.put('/centers/:centerId', Auth.checkAdminStatus, Center.modifyCenter);
router.post('/centers', Validate.addCenter, Auth.checkAdminStatus, Center.addCenter);

router.get('/events', Event.getAllEvents);
router.post('/events', Validate.addEvent, Auth.verifyUser, Event.addEvent);
router.put('/events/:eventId', Auth.verifyUser, Event.modifyEvent);
router.delete('/events/:eventId', Auth.verifyUser, Event.deleteEvent);

router.post('/users', Validate.signUp, User.createUser);
router.post('/users/login', Validate.signIn, User.login);
/**
 * catch all route
 */
router.get('*', (req, res) => res.status(200).send({
  message: 'Hi there, Welcome to Event Manager.',
}));


export default router;
