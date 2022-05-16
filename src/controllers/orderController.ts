import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/orderService';

export default class OrderController {
  public service = new OrderService();

  public getAll = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
    const orders = await this.service.getAll();
    return res.status(200).json(orders);
  };
}