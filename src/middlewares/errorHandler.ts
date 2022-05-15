import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

require('express-async-errors');

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (Joi.isError(err)) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
  console.log(err);
  return res.status(500).json({ messages: 'Ops, deu algo errado!' });
};

export default errorHandler;