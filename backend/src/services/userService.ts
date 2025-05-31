
import { UserRepository } from '../repositories/userRepository';
import { IUserRepository, IUserProfile, IProfileUpdateData, IUserService, IPasswordResetData } from '../interface/IUser';
import { ICategory } from '../interface/ICategory';

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(id: string): Promise<IUserProfile> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateProfile(id: string, data: IProfileUpdateData): Promise<IUserProfile> {
    const updatedUser = await this.userRepository.updateProfile(id, data);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  async getCatogories():Promise<ICategory[]>{
    return await this.userRepository.getCatgories()
  }

  async resetPassword(id: string, data: IPasswordResetData): Promise<void> {
    await this.userRepository.resetPassword(id, data);
  }
}