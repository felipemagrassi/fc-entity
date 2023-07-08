import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";
import OrderItem from "../entity/order_item";

describe("Order factory unit tests", () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Item 1",
          price: 10,
          quantity: 1,
          product_id: uuid(),
        },
      ],
    };
    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customer_id).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
    expect(order.items[0]).toBeInstanceOf(OrderItem);
  });
});
