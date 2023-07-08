import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customer_id: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customer_id: string, items: OrderItem[]) {
    this._id = id;
    this._customer_id = customer_id;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customer_id(): string {
    return this._customer_id;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }

    if (this._customer_id.length === 0) {
      throw new Error("Customer ID is required");
    }

    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Item quantity cannot be zero or less");
    }
  }

  addItem(orderItem: OrderItem) {
    if (this._items.some((item) => item.id === orderItem.id)) {
      throw new Error("Item already exists in order");
    }
    if (this._items.some((item) => item.productId === orderItem.productId)) {
      throw new Error("Product already exists in order");
    }

    this._items.push(orderItem);
    this.validate();
  }

  removeItem(orderItem: OrderItem) {
    if (!this._items.some((item) => item.id === orderItem.id)) {
      throw new Error("Item does not exist in order");
    }

    this._items = this._items.filter((item) => item.id !== orderItem.id);
    this.validate();
  }

  total() {
    return this._items.reduce(
      (total, item) => total + item.orderItemTotal(),
      0
    );
  }
}
