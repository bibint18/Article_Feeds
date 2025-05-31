
import User, { IUser } from '../models/User';
import { IUserRepository, IUserProfile, IProfileUpdateData } from '../interface/IUser'
import { ICategory } from '../interface/ICategory';
import Category from '../models/Category';

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
}