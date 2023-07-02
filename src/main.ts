import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

let customer = new Customer("1", "John");
const address = new Address("Rua 1", 123, "12345-123", "São Paulo");

customer.setAddress(address);
customer.activate();

const item = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);

const order = new Order("1", "1", [item, item2]);