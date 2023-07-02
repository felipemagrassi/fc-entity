import Order from "../entity/order";
import Customer from "../entity/customer";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);

    return order;
  }
  static total(orders: Order[]) {
    let total = 0;
    orders.forEach((order) => {
      total += order.total();
    });
    return total;
  }
}
