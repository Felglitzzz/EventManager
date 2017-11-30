import express from 'express';
import Event from '../controllers/eventController';
import Center from '../controllers/centerController';
import User from '../controllers/userController';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/centers', Center.getAllCenters);
router.get('/centers/:centerId', Auth.checkAdminStatus, Center.getOneCenter);
router.put('/centers/:centerId', Auth.checkAdminStatus, Center.modifyCenter);
router.post('/centers', Auth.checkAdminStatus, Center.addCenter);

router.get('/events', Auth.verifyUser, Event.getAllEvents);
router.post('/events', Event.addEvent);
router.put('/events/:eventId', Event.modifyEvent);
router.delete('/events/:eventId', Event.deleteEvent);

router.post('/users', User.createUser);
router.post('/users/login', User.login);
/**
 * catch all route
 */
router.get('*', (req, res) => res.status(200).send({
  message: 'Hi there, Welcome to the Event Manager.',
}));


export default router;
