import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import mongoConnect from './db/db';
import distributeRoute from './routes/distribute.routes';
import foodRoute from './routes/food.routes';
import rootRoute from './routes/root.routes';
import studentRoute from './routes/student.routes';
import { app, server } from './utils/createServer';

// env config
env.config();

// server port
const port = process.env.PORT || 5000;

// app middleware
app.use(express.json());
app.use(cors());

// database connection with mongoose
mongoConnect();

// all routes
app.use('/', rootRoute);
app.use('/student', studentRoute);
app.use('/food', foodRoute);
app.use('/distribute', distributeRoute);

// listen server
server.listen(port, () => {
    console.log(`Hello Boss! I am listening at http://localhost:${port}`);
});
