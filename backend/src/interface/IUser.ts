import { Document } from 'mongoose';
import { ICategory } from './ICategory';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date;
  password: string;
  articlePreferences: ICategory['_id'][];
}


// import { ICategory } from '../models/Category';

export interface IUserProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date;
  articlePreferences: ICategory['_id'][];
}

export interface IProfileUpdateData {
  firstName: string;
  lastName: string;
  dob: Date;
  articlePreferences: ICategory['_id'][];
}
export interface IPasswordResetData {
  currentPassword: string;
  newPassword: string;
}
export interface IUserRepository {
  findById(id: string): Promise<IUserProfile | null>;
  findByEmail(email: string): Promise<IUserProfile | null>;
  updateProfile(id: string, data: IProfileUpdateData): Promise<IUserProfile | null>;
  getCatgories():Promise<ICategory[]>
  resetPassword(id: string, data: IPasswordResetData): Promise<void>;
}

export interface IUserService {
  getProfile(id: string): Promise<IUserProfile>;
  updateProfile(id: string, data: IProfileUpdateData): Promise<IUserProfile>;
  getCatogories():Promise<ICategory[]>
  resetPassword(id: string, data: IPasswordResetData): Promise<void>;
}

export interface IUserController {
  getProfile(req: any, res: any): Promise<void>;
  updateProfile(req: any, res: any): Promise<void>;
  getCategories(req:any,res:any):Promise<void>
  resetPassword(req: any, res: any): Promise<void>;
}