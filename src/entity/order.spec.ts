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
    const item = new OrderItem("1", "1", 100);
    const item2 = new OrderItem("2", "1", 200);
    const order = new Order("1", "1", [item, item2]);

    let total = order.total();

    expect(total).toBe(300);

    const order2 = new Order("2", "1", [item]);
    total = order2.total();

    expect(total).toBe(100);
  });
});
