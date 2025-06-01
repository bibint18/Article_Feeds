
import User, { IUser } from '../models/User';
import { IUserRepository, IUserProfile, IProfileUpdateData, IPasswordResetData } from '../interface/IUser'
import { ICategory } from '../interface/ICategory';
import Category from '../models/Category';
import bcrypt from 'bcryptjs'
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<IUserProfile | null> {
    return User.findById(id).populate('articlePreferences').select('-password');
  }

  async findByEmail(email: string): Promise<IUserProfile | null> {
    return User.findOne({ email }).select('-password');
  }

  async updateProfile(id: string, data: IProfileUpdateData): Promise<IUserProfile | null> {
    return User.findByIdAndUpdate(id, { $set: data }, { new: true }).populate('articlePreferences').select('-password');
  }

  async getCatgories():Promise<ICategory[]>{
    return await Category.find()
  }
  async resetPassword(id: string, data: IPasswordResetData): Promise<void> {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch){
      throw new Error('Current password is incorrect')
       console.log('incorrect');
    } 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.newPassword, salt);
    user.password = hashedPassword;
    await user.save();
  }
}