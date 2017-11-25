import express from 'express';
import Event from '../controllers/event';
import Center from '../controllers/center';

const router = express.Router();


router.get('/centers', Center.getAllCenters);
router.get('/centers/:centerId', Center.getOneCenter);
router.put('/centers/:centerId', Center.editCenter);
router.post('/centers', Center.addCenter);
router.post('/events', Event.addEvent);
router.put('/events/:eventId', Event.editEvent);
router.delete('/events/:eventId', Event.deleteEvent);

/**
 * catch all route
 */
router.get('*', (req, res) => res.status(200).send({
  message: 'Hi there, Welcome to the Event Manager.',
}));


export default router;
