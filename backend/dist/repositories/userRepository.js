import User from '../models/User';
import Category from '../models/Category';
import bcrypt from 'bcryptjs';
export class UserRepository {
    async findById(id) {
        return User.findById(id).populate('articlePreferences').select('-password');
    }
    async findByEmail(email) {
        return User.findOne({ email }).select('-password');
    }
    async updateProfile(id, data) {
        return User.findByIdAndUpdate(id, { $set: data }, { new: true }).populate('articlePreferences').select('-password');
    }
    async getCatgories() {
        return await Category.find();
    }
    async resetPassword(id, data) {
        const user = await User.findById(id);
        if (!user)
            throw new Error('User not found');
        const isMatch = await bcrypt.compare(data.currentPassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
            console.log('incorrect');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.newPassword, salt);
        user.password = hashedPassword;
        await user.save();
    }
}
