import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import scholarshipRoutes from './routes/scholarships.js'

dotenv.config();
const app = express();
app.use(cors({
  origin: 'https://scholarshipfinder-1.onrender.com',
  methods: ['GET', 'POST','PUT'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('mongodb connected successfully');
} catch (error) {
  console.log(error);
}

app.use('/api/users', userRoutes);
app.use('/api/scholarships', scholarshipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})