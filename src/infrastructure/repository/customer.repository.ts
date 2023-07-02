import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(customer: Customer): Promise<void> {
    await CustomerModel.create({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zipcode,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  }

  async update(customer: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: customer.id,
        name: customer.name,
        street: customer.Address.street,
        number: customer.Address.number,
        zipcode: customer.Address.zipcode,
        city: customer.Address.city,
        active: customer.isActive(),
        rewardPoints: customer.rewardPoints,
      },
      { where: { id: customer.id } }
    );
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );

      customer.setAddress(address);
      customer.addRewardPoints(customerModel.rewardPoints);
      customerModel.active ? customer.activate() : customer.deactivate();

      return customer;
    });

    return customers;
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer.setAddress(address);
    return customer;
  }
}
