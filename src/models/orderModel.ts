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
    
    console.log(orders);
    const orderObj: Array<IOrder> = Object
      .values(orders).map((order) => ({ id: order.id, userId: order.userId, productsIds: [] }));
    
    Object.values(products).forEach((product) => {
      Object.values(orders).forEach((order, index) => {
        if (order.id === product.orderId) {
          // if (order.productsIds === undefined) order.productsIds = [];
          // order.productsIds.push(product.prodId);
          orderObj[index].productsIds.push(product.prodId);
        }
      });
    });
    console.log(orderObj);
    
    return orderObj as IOrder[];
  };
}