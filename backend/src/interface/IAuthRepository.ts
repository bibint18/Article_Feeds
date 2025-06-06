import { IUser } from './IUser.js';
import { ICategory } from './ICategory.js';

export interface IAuthRepository {
  findCategoryByName(name: string): Promise<ICategory | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  createUser(userData: Partial<IUser>): Promise<IUser>;
}