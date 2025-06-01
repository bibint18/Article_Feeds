import { UserRepository } from '../repositories/userRepository';
export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async getProfile(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new Error('User not found');
        return user;
    }
    async updateProfile(id, data) {
        const updatedUser = await this.userRepository.updateProfile(id, data);
        if (!updatedUser)
            throw new Error('User not found');
        return updatedUser;
    }
    async getCatogories() {
        return await this.userRepository.getCatgories();
    }
    async resetPassword(id, data) {
        await this.userRepository.resetPassword(id, data);
    }
}
