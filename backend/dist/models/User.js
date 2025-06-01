import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    articlePreferences: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});
export default mongoose.model('User', UserSchema);
