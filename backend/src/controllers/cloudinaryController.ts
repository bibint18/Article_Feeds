import { Request, Response } from 'express';
import { generateSignature } from '../services/cloudinary.js';

export class CloudinaryController {
  async getSignature(req: Request, res: Response): Promise<void> {
    try {
      const { signature, timestamp } = generateSignature();
      res.status(200).json({ signature, timestamp, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY });
    } catch (error: any) {
      res.status(500).json({ message: 'Failed to generate signature', error: error.message });
    }
  }
}