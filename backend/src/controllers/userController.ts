
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { IUserController, IProfileUpdateData, IPasswordResetData } from '../interface/IUser'

interface AuthRequest extends Request {
  user?: { id: string };
}

export class UserController implements IUserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      console.log(req.user?.id)
      const profile = await this.userService.getProfile(req.user?.id || '');
      res.json(profile);
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 500).json({ message: error.message });
    }
  }

  async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data: IProfileUpdateData = req.body;
      const updatedUser = await this.userService.updateProfile(req.user?.id || '', data);
      res.json({ message: 'Profile updated successfully', profile: updatedUser });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCategories(req:AuthRequest,res:Response):Promise<void>{
    try {
      const categories = await this.userService.getCatogories()
      console.log(categories)
      res.json(categories)
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  async resetPassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      console.log("reached controller reset")
      const data: IPasswordResetData = req.body;
      await this.userService.resetPassword(req.user?.id || '', data);
      res.json({ message: 'Password updated successfully' });
    } catch (error: any) {
      // res.status(error.message.includes('incorrect') ? 401 : 500).json({ message: error.message });
      res.status(500).json({message:error.message})
    }
  }
}