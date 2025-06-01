import { UserService } from '../services/userService';
export class UserController {
    constructor() {
        this.userService = new UserService();
    }
    async getProfile(req, res) {
        try {
            console.log(req.user?.id);
            const profile = await this.userService.getProfile(req.user?.id || '');
            res.json(profile);
        }
        catch (error) {
            res.status(error.message.includes('not found') ? 404 : 500).json({ message: error.message });
        }
    }
    async updateProfile(req, res) {
        try {
            const data = req.body;
            const updatedUser = await this.userService.updateProfile(req.user?.id || '', data);
            res.json({ message: 'Profile updated successfully', profile: updatedUser });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getCategories(req, res) {
        try {
            const categories = await this.userService.getCatogories();
            console.log(categories);
            res.json(categories);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async resetPassword(req, res) {
        try {
            console.log("reached controller reset");
            const data = req.body;
            await this.userService.resetPassword(req.user?.id || '', data);
            res.json({ message: 'Password updated successfully' });
        }
        catch (error) {
            // res.status(error.message.includes('incorrect') ? 401 : 500).json({ message: error.message });
            res.status(500).json({ message: error.message });
        }
    }
}
