import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js'; 
import blogRoute from './routes/blog.route.js'; 
import { connectDB } from './database/db.js';
import fileUpload from 'express-fileupload';
import cloudinary from "cloudinary";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000; 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}))

// Database Connection
connectDB();

// Cloudinary Code
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY
});

// All routes starting with '/api/users' will be handled by userRoute
app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);

app.get('/', (req, res) => {
  res.send('Hello World! The server is runninggggg.');
});


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

