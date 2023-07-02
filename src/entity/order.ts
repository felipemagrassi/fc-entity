import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("Customer ID is required");
    }

    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Item quantity cannot be zero or less");
    }
  }

  total() {
    return this._items.reduce(
      (total, item) => total + item.orderItemTotal(),
      0
    );
  }
}
