import { Router } from 'express';
import { CloudinaryController } from '../controllers/cloudinaryController.js';

const router = Router();
const cloudinaryController = new CloudinaryController();

router.get('/signature', cloudinaryController.getSignature.bind(cloudinaryController));

export default router;