// project here
import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send({ status: 'OK' });
});

export default app;
