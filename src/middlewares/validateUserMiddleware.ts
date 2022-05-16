import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import checkStatus from './checkStatus';

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

const validateUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  // console.log('\nerror ==== ', error, '\n');
  console.log('\nerror type ==== ', error?.details[0].type, '\n');

  const errorType = error?.details[0].type;
  if (checkStatus.code400(errorType)) return res.status(400).json({ message: error?.message });
  if (checkStatus.code422(errorType)) return res.status(422).json({ message: error?.message });

  next();
};

export default validateUserMiddleware;