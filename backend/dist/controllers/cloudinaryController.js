import { generateSignature } from '../services/cloudinary';
export class CloudinaryController {
    async getSignature(req, res) {
        try {
            const { signature, timestamp } = generateSignature();
            res.status(200).json({ signature, timestamp, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to generate signature', error: error.message });
        }
    }
}
