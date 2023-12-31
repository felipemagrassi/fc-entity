import Order from "./order";
import OrderItem from "./order_item";

describe("Orders unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Order("", "1", [])).toThrowError("ID is required");
  });

  it("should throw an error when customerId is empty", () => {
    expect(() => new Order("1", "", [])).toThrowError(
      "Customer ID is required"
    );
  });

  it("should throw an error when no items are provided", () => {
    expect(() => new Order("1", "1", [])).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "1", 100, 3, "1");
    const item2 = new OrderItem("2", "1", 200, 2, "2");
    const order = new Order("1", "1", [item, item2]);

    let total = order.total();

    expect(total).toBe(700);

    const order2 = new Order("2", "1", [item]);
    total = order2.total();

    expect(total).toBe(300);
  });


  it("should remove item from order", () => {
    const item = new OrderItem("1", "1", 100, 3, "1");
    const item2 = new OrderItem("2", "1", 200, 2, "2");
    const order = new Order("1", "1", [item, item2]);

    order.removeItem(item);

    expect(order.items.length).toBe(1)
  });

  it("should throw an error when item doesnt exist in order", () => {
    const item = new OrderItem("1", "1", 100, 3, "1");
    const item2 = new OrderItem("2", "1", 200, 2, "2");
    const order = new Order("1", "1", [item]);

    expect(() => order.removeItem(item2)).toThrowError(
      "Item does not exist in order"
    );
  });

  it("should add item to order", () => {
    const item = new OrderItem("1", "1", 100, 3, "1");
    const item2 = new OrderItem("2", "1", 200, 2, "2");

    const order = new Order("1", "1", [item]);
    expect(order.items.length).toBe(1)

    order.addItem(item2)
    expect(order.items.length).toBe(2)
  });

  it("shouldnt add the same item to order", () => {
    const item = new OrderItem("1", "1", 100, 3, "1");
    const item2 = new OrderItem("2", "1", 200, 2, "2");

    const order = new Order("1", "1", [item]);
    expect(order.items.length).toBe(1)

    order.addItem(item2)
    expect(order.items.length).toBe(2)

    expect(() => order.addItem(item2)).toThrowError(
      "Item already exists in order"
    );
  });

  it("should throw an error when item quantity is zero or less", () => {
    const item = new OrderItem("1", "1", 100, 0, "1");
    expect(() => new Order("1", "1", [item])).toThrowError(
      "Item quantity cannot be zero or less"
    );
  });
});
