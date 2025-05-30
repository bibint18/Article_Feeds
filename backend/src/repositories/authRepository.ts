import { IAuthRepository } from '../interface/IAuthRepository';
import User, { IUser } from '../models/User';
import Category, { ICategory } from '../models/Category';

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