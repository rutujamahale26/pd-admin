import express from 'express';
import { subscribeUser, unsubscribeUser } from '../controllers/subscriberController.js';

const router = express.Router();

router.post('/', subscribeUser)
router.post('/unsubscribe', unsubscribeUser)



export default router;