import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import bookRouter from './routes/bookRouter.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/users', userRouter);
app.use('/books', bookRouter);


app.get('/', (req, res) => {
    res.send('🚀 Welcome to the API!');
});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


console.log('MONGODB_URI:', MONGODB_URI);

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in .env file.');
    process.exit(1);
}


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://127.0.0.1:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });
