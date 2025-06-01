import mongoose, { Schema } from 'mongoose';
const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
});
export default mongoose.model('Category', CategorySchema);
