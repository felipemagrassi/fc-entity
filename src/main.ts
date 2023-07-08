import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";
import Product from "./domain/product/entity/product";

let customer = new Customer("1", "John");
const address = new Address("Rua 1", 123, "12345-123", "São Paulo");

customer.setAddress(address);
customer.activate();

const product = new Product("1", "Product 1", 10);
const product2 = new Product("2", "Product 2", 20);

const item = new OrderItem("1", "Item 1", 10, 2, product.id);
const item2 = new OrderItem("2", "Item 2", 20, 1, product2.id);

const order = new Order("1", "1", [item, item2]);
