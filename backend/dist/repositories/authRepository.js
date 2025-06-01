import User from '../models/User';
import Category from '../models/Category';
export class AuthRepository {
    async findCategoryByName(name) {
        return Category.findOne({ name });
    }
    async findUserByEmail(email) {
        return User.findOne({ email });
    }
    async createUser(userData) {
        return User.create(userData);
    }
}
