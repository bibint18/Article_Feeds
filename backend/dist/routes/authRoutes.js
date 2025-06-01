import { Router } from 'express';
import { AuthController } from '../controllers/authController';
const router = Router();
const authController = new AuthController();
router.post('/register', authController.register.bind(authController));
router.post('/verify-otp', authController.verifyOtp.bind(authController));
router.post('/resend-otp', authController.resendOtp.bind(authController));
router.post('/login', authController.login.bind(authController));
export default router;
