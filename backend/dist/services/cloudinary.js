// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// export const uploadImage = async (file: string): Promise<string> => {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
//       folder: 'mern_articles',
//     });
//     return result.secure_url;
//   } catch (error) {
//     throw new Error('Image upload failed');
//   }
// };
// export default cloudinary;
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'mern_articles',
        });
        return result.secure_url;
    }
    catch (error) {
        throw new Error('Image upload failed');
    }
};
export const generateSignature = () => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder: 'mern_articles' }, process.env.CLOUDINARY_API_SECRET);
    return { signature, timestamp };
};
export default cloudinary;
