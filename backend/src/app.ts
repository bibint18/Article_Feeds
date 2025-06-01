import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import articleRoutes from './routes/articleRoutes.js'
import cloudinaryRoutes from './routes/cloudinaryRoute.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config();
const app = express();

app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/articles',articleRoutes)
app.use('/api/cloudinary', cloudinaryRoutes);
app.use('/api/users',userRoutes)
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();