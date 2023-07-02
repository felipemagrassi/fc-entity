import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/customer.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerRepository from "./customer.repository";
describe("CustomerRepository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.setAddress(new Address("Street", 1, "12345", "City 1"));

    await customerRepository.create(customer);

    const customerCreated = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerCreated.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zipcode,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.setAddress(new Address("Street", 1, "12345", "City 1"));
    await customerRepository.create(customer);

    const customerCreated = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerCreated.toJSON()).toEqual({
      id: customer.id,
      name: "Customer 1",
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zipcode,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerUpdated = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerUpdated.toJSON()).toEqual({
      id: customer.id,
      name: "Customer 2",
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zipcode,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.setAddress(new Address("Street", 1, "12345", "City 1"));
    await customerRepository.create(customer);
    const customerCreated = await CustomerModel.findOne({ where: { id: "1" } });

    const foundCustomer = await customerRepository.find("1");

    expect(customerCreated.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: foundCustomer.name,
      street: foundCustomer.Address.street,
      number: foundCustomer.Address.number,
      zipcode: foundCustomer.Address.zipcode,
      city: foundCustomer.Address.city,
      active: foundCustomer.isActive(),
      rewardPoints: foundCustomer.rewardPoints,
    });
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("1");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1", "Customer 1");
    customer1.setAddress(new Address("Street", 1, "12345", "City 1"));
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Customer 2");
    customer2.setAddress(new Address("Street", 1, "12345", "City 1"));
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(customers).toEqual(foundCustomers);
  });
});
