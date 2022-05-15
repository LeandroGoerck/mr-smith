import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ERR from './errorMessages';

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const validateProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { error } = productSchema.validate(req.body);
  console.log('\nerror ==== ', error, '\n');
  if (error) {
    const productsValidationObj = {
      [ERR.NAME_IS_REQUIRED]: () => res.status(400).json({ message: ERR.NAME_IS_REQUIRED }),
      [ERR.NAME_STRING]: () => res.status(422).json({ message: ERR.NAME_STRING }),
      [ERR.NAME_LENGTH]: () => res.status(422).json({ message: ERR.NAME_LENGTH }),
      [ERR.AMOUNT_IS_REQUIRED]: () => res.status(400).json({ message: ERR.AMOUNT_IS_REQUIRED }),
      [ERR.AMOUNT_STRING]: () => res.status(422).json({ message: ERR.AMOUNT_STRING }),
      [ERR.AMOUNT_LENGTH]: () => res.status(422).json({ message: ERR.AMOUNT_LENGTH }),
  
      DEFAULT:
        () => { throw new Error(); },
    };
  
    return (productsValidationObj[error.message] || productsValidationObj.DEFAULT)();
  }

  next();
};

export default validateProductMiddleware;