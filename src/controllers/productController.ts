import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/productService';

export default class ProductController {
  public service = new ProductService();

  public getAll = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const products = await this.service.getAll();
    return res.status(200).json(products);
  };

  public create = async (req: Request, res: Response, next: NextFunction)
  : Promise<Response | void> => {
    const { name, amount } = req.body;
    try {
      const product = await this.service.create(name, amount);
      return res.status(201).json(product);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('Product already exists')) {
        return res.status(403).json({ message: error.message });
      }
      next(error);
    }
  };
}