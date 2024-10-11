import express from 'express';
import cors from 'cors';

import userRouter from './routes/usersRoutes.mjs';
import categoryRouter from  './routes/categoryRoutes.mjs'
import booksRouter from './routes/booksRoutes.mjs'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/users', userRouter);
app.use('/v1/category', categoryRouter);
app.use('/v1/books', booksRouter);

export default app;
