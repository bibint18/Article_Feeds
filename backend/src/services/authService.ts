import { IAuthService,LoginRequest,RegisterRequest } from '../interface/IAuthService';
import { IAuthRepository } from '../interface/IAuthRepository';
import { AuthRepository } from '../repositories/authRepository';
import { generateOtp, sendOtpEmail } from '../utils/otpGenerator';
// import { ICategory } from '../interfaces/ICategory';
import bcrypt from 'bcryptjs';
import Category from '../models/Category';
import { IUser } from '../interface/IUser';
import jwt from 'jsonwebtoken';
interface OtpData {
  [email: string]: { otp: string; timestamp: number; userData: RegisterRequest };
}

const otpStore: OtpData = {};

export class AuthService implements IAuthService {
  private repository: IAuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async register(data: RegisterRequest): Promise<{ userData: RegisterRequest; otp: string }> {
    const { email, password, confirmPassword, articlePreferences } = data;

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const existingUser = await this.repository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const categoryIds: string[] = [];
    for (const name of articlePreferences) {
      let category = await this.repository.findCategoryByName(name);
      if (!category) {
        category = await Category.create({ name });
      }
      categoryIds.push(category.id.toString()); // Convert ObjectId to string
    }

    const otp = generateOtp();
    otpStore[email] = { otp, timestamp: Date.now(), userData: { ...data, articlePreferences: categoryIds } };
    await sendOtpEmail(email, otp);

    return { userData: { ...data, articlePreferences: categoryIds }, otp };
  }

  async resendOtp(email: string): Promise<{ userData: RegisterRequest; otp: string }> {
    const storedData = otpStore[email];
    if (!storedData) {
      throw new Error('No registration data found for this email');
    }

    const otpAge = (Date.now() - storedData.timestamp) / 1000;
    if (otpAge < 60) {
      throw new Error(`Please wait ${Math.ceil(60 - otpAge)} seconds before requesting a new OTP`);
    }

    const newOtp = generateOtp();
    otpStore[email] = { ...storedData, otp: newOtp, timestamp: Date.now() };
    await sendOtpEmail(email, newOtp);

    return { userData: storedData.userData, otp: newOtp };
  }

  async verifyOtp(email: string, otp: string): Promise<any> {
    const storedData = otpStore[email];
    if (!storedData) {
      throw new Error('OTP not found or expired');
    }

    if (storedData.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    const otpAge = (Date.now() - storedData.timestamp) / 1000 / 60;
    if (otpAge > 10) {
      delete otpStore[email];
      throw new Error('OTP expired');
    }

    const hashedPassword = await bcrypt.hash(storedData.userData.password, 10);
    const userData = {
      ...storedData.userData,
      password: hashedPassword,
      dob: new Date(storedData.userData.dob), // Convert string to Date
      articlePreferences: storedData.userData.articlePreferences,
    };

    const user = await this.repository.createUser(userData);
    delete otpStore[email];
    return user;
  }

  async login(data: LoginRequest): Promise<{ user: Partial<IUser>; accessToken: string; refreshToken: string }> {
    const { email, password } = data;
    const user = await this.repository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'access-secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET || 'refresh-secret',
      { expiresIn: '7d' }
    );

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        articlePreferences: user.articlePreferences.map((id) => id.toString()),
      },
      accessToken,
      refreshToken,
    };
  }
}