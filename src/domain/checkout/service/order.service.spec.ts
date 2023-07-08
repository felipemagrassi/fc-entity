import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

import OrderService from "./order.service";

describe("order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "customer 1");
    const item = new OrderItem("1", "item 1", 20, 2, "1");

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(20);
    expect(order.total()).toBe(40);
  });

  it("should return the total of all orders", () => {
    const item = new OrderItem("1", "item 1", 20, 2, "1");
    const item2 = new OrderItem("2", "item 2", 10, 1, "2");

    const order1 = new Order("1", "c1", [item]);
    const order2 = new Order("2", "c2", [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(50);
  });
});
