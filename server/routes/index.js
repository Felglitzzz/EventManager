import express from 'express';
import Event from '../controllers/eventController';
import Center from '../controllers/centerController';
import User from '../controllers/userController';

const router = express.Router();

router.get('/centers', Center.getAllCenters);
router.get('/events', Event.getAllEvents);
router.get('/centers/:centerId', Center.getOneCenter);
router.put('/centers/:centerId', Center.modifyCenter);
router.post('/centers', Center.addCenter);
router.post('/events', Event.addEvent);
router.put('/events/:eventId', Event.modifyEvent);
router.delete('/events/:eventId', Event.deleteEvent);


router.post('/users', User.createUser);
/**
 * catch all route
 */
router.get('*', (req, res) => res.status(200).send({
  message: 'Hi there, Welcome to the Event Manager.',
}));


export default router;
