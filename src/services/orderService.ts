import IOrder from '../interfaces/order.interface';
import OrderModel from '../models/orderModel';

export default class OrderService {
  public model = new OrderModel();

  public getAll = async (): Promise<IOrder[]> => {
    const orders = await this.model.getAll();
    return orders;
  };
}