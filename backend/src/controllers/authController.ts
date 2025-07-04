import { NextFunction, Request, Response } from 'express';
import { IAuthController } from '../interface/IAuthController.js';
import { AuthService } from '../services/authService.js';

export class AuthController implements IAuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      console.log("reach here")
      const data = req.body;
      const { userData } = await this.authService.register(data);
      res.status(200).json({ message: 'OTP sent to email', userData });
    } catch (error: any) {
      next(error)
      // res.status(400).json({ message: error.message });
    }
  }

  async resendOtp(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const { userData } = await this.authService.resendOtp(email);
      res.status(200).json({ message: 'New OTP sent to email', userData });
    } catch (error: any) {
      next(error)
      // res.status(400).json({ message: error.message });
    }
  }

  async verifyOtp(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const { email, otp } = req.body;
      const user = await this.authService.verifyOtp(email, otp);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      next(error)
      // res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const data = req.body;
      const { user, accessToken, refreshToken } = await this.authService.login(data);
      res.status(200).json({ message: 'Login successful', user, accessToken, refreshToken });
    } catch (error: any) {
      next(error)
      // res.status(400).json({ message: error.message });
    }
  }

  async refresh(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const { accessToken } = await this.authService.refresh({ refreshToken });
      res.status(200).json({ data: { accessToken } });
    } catch (error: any) {
      next(error)
      // res.status(401).json({ message: error.message });
    }
  }
}