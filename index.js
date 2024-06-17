import express from 'express';
import { port, connectdb } from './config.js'; 
import mongoose from 'mongoose';
import cors from 'cors';
import booksRoute from './routes/booksRoutes.js';  
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));


app.use('/books', booksRoute);

app.get('/', (req, res) => {
  res.status(200).send('Book Store');
});

connectdb(process.env.mongoDBURL).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
