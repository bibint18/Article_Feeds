import { IAuthRepository } from '../interface/IAuthRepository.js';
import User, { IUser } from '../models/User.js';
import Category, { ICategory } from '../models/Category.js';

export class AuthRepository implements IAuthRepository {
  async findCategoryByName(name: string): Promise<ICategory | null> {
    return Category.findOne({ name });
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    return User.create(userData);
  }
}