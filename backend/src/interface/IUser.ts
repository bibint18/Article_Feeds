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