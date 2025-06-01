import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from './Category.js';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date;
  password: string;
  articlePreferences: ICategory['_id'][];
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  articlePreferences: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

export default mongoose.model<IUser>('User', UserSchema);