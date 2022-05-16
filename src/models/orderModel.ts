import connection from './connection';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  public getAll = async (): Promise<IOrder[]> => {
    const [orders] = await connection.execute(
      'SELECT ord.id as id, ord.userId as userId FROM Trybesmith.Orders as ord;',
    );
    const [products] = await connection.execute(
      'SELECT orderId, id as prodId  FROM Trybesmith.Products;',
    );

    Object.values(products).forEach((product) => {
      Object.values(orders).forEach((order) => {
        if (order.id === product.orderId) {
          // eslint-disable-next-line no-param-reassign
          if (order.productsIds === undefined) order.productsIds = [];
          order.productsIds.push(product.prodId);
        }
      });
    });
    
    return orders as IOrder[];
  };
}