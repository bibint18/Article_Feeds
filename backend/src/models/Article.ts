import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from './Category';
import { IUser } from './User';
export interface IArticle extends Document {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: ICategory['_id'];
  author: IUser['_id'];
  likes: IUser['_id'][];
  dislikes: IUser['_id'][];
  blocked: IUser['_id'][];
  createdAt: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  tags: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  blocked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IArticle>('Article', ArticleSchema);