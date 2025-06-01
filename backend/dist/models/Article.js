import mongoose, { Schema } from 'mongoose';
const ArticleSchema = new Schema({
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
export default mongoose.model('Article', ArticleSchema);
