import express from 'express';
import GetAllCenters from '../controllers/allcenter';
import GetSingleCenter from '../controllers/singlecenter';

const router = express.Router();



router.get('/centers', GetAllCenters.getAllCenters);
router.get('/centers/:centerid', GetSingleCenter.getOneCenter);

router.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager.',
  }));


export default router;