import { NextFunction } from 'express';
import { AuthRoute, PostRoute, UserRoute } from './routes';
import express from 'express';
import dotenv from 'dotenv';

const mongoose = require('mongoose');
dotenv.config();
const cors = require('cors');

const cookieParser = require('cookie-parser');

const app = express();
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        withCredentials: true,
    }),
);
app.use(cookieParser());

const connect = () => {
    const mongodb = process.env.MONGO_URI;
    mongoose.connect(mongodb);
    console.log('Connect mongoDB database');
};
connect();

const port = process.env.PORT;

app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/post', PostRoute);

app.all('*', (next: NextFunction) => {
    const err = new Error('The route can not be found');
    err.stack = '404';
    next(err);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
