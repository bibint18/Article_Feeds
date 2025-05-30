import { IUser } from './IUser';
import { ICategory } from './ICategory';

export interface IAuthRepository {
  findCategoryByName(name: string): Promise<ICategory | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  createUser(userData: Partial<IUser>): Promise<IUser>;
}