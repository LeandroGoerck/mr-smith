// project here
import express, { Request, Response } from 'express';
import errorHandler from './middlewares/errorHandler';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import loginRoutes from './routes/loginRoutes';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send({ status: 'OK' });
});
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/login', loginRoutes);
app.use(errorHandler);

export default app;
