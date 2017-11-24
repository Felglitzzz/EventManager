import express from 'express';
import GetAllCenters from '../controllers/allcenter';
import GetSingleCenter from '../controllers/singlecenter';
import ModifyCenter from '../controllers/editcenter';
import AddCenter from '../controllers/newcenter';
import AddEvent from '../controllers/createvent';
import ModifyEvent from '../controllers/editevent';

const router = express.Router();



router.get('/centers', GetAllCenters.getAllCenters);
router.get('/centers/:centerId', GetSingleCenter.getOneCenter);
router.put('/centers/:centerId', ModifyCenter.editCenter);
router.post('/centers', AddCenter.createCenter);
router.post('/centers', AddCenter.createCenter);
router.post('/events', AddEvent.create);
router.put('/events/:eventId', ModifyEvent.update);



router.get('*', (req, res) => res.status(200).send({
    message: 'Hi there, Welcome to the Event Manager.',
  }));


export default router;