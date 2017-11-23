import express from 'express';
import getAllcenters from '../controllers/allcenter';

const router = express.Router();



router.get('/centers', getAllcenters.getAll);

router.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the Event Manager.',
  }));


export default router;