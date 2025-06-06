
import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();
const userController = new UserController();


router.get('/profile',authMiddleware, userController.getProfile.bind(userController));
router.patch('/profile',authMiddleware, userController.updateProfile.bind(userController));
router.get('/categories',authMiddleware,userController.getCategories.bind(userController))
router.patch('/reset-password',authMiddleware,userController.resetPassword.bind(userController))
export default router;