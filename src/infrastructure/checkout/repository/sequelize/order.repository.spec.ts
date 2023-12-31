import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderModel from "./order.model";

describe("OrderRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street", 1, "12345", "City 1");

    customer.setAddress(address);

    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepository = new OrderRepository();

    const order = new Order("1", "1", [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "1" },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "1",
          product_id: "1",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street", 1, "12345", "City 1");
    customer.setAddress(address);
    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepository = new OrderRepository();
    const order = new Order("1", "1", [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "1" },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "1",
          product_id: "1",
        },
      ],
    });

    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      1,
      product2.id
    );

    order.addItem(orderItem2);
    order.removeItem(orderItem);

    await orderRepository.update(order);
    const updatedOrderModel = await OrderModel.findOne({
      where: { id: "1" },
      include: ["items"],
    });

    expect(updatedOrderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "1",
          product_id: "2",
        },
      ],
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street", 1, "12345", "City 1");

    customer.setAddress(address);

    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const orderRepository = new OrderRepository();
    const order = new Order("2", "1", [orderItem]);
    await orderRepository.create(order);

    expect(await orderRepository.find("2")).toStrictEqual(order);
  });

  it("should throw an error when customer is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("1");
    }).rejects.toThrow("Order not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street", 1, "12345", "City 1");

    customer.setAddress(address);

    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      1,
      product2.id
    );

    const orderRepository = new OrderRepository();
    const order = new Order("1", "1", [orderItem]);
    const order2 = new Order("2", "1", [orderItem2]);
    await orderRepository.create(order);
    await orderRepository.create(order2);

    expect(await orderRepository.findAll()).toStrictEqual([order, order2]);
  });
});
