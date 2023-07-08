import Customer from "./customer";
import Address from "./address";

import AddNewCustomerToThirdPartyApiHandler from "../event/customer/handler/add-new-customer-to-third-party-api.handler";
import SendEmailWhenCustomerIsCreatedHandler from "../event/customer/handler/send-email-when-customer-is-created.handler";
import AddNewAddressToStoreHandler from "../event/customer/handler/add-new-address-to-store.handler";


describe("Customer unit tests", () => {
  it("should send email when creating a customer", () => {
    const spy = jest.spyOn(SendEmailWhenCustomerIsCreatedHandler.prototype, "handle");
    const customer = new Customer("1", "John");
    const address = new Address("Rua 1", 123, "12345-123", "São Paulo");

    customer.setAddress(address);
    customer.create();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should add new customer to third party api when creating a customer", () => {
    const spy = jest.spyOn(AddNewCustomerToThirdPartyApiHandler.prototype, "handle");

    const customer = new Customer("1", "John");
    const address = new Address("Rua 1", 123, "12345-123", "São Paulo");

    customer.setAddress(address);
    customer.create();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should be able to change addresses", () => {
    const spy = jest.spyOn(AddNewAddressToStoreHandler.prototype, "handle");

    const customer = new Customer("1", "John");
    const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
    customer.setAddress(address);

    expect(customer.Address).toEqual(address);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when name is empty", () => {
    expect(() => new Customer("1", "")).toThrowError("Name is required");
  });

  it("should throw an error when id is empty", () => {
    expect(() => new Customer("", "John")).toThrowError("ID is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John");
    customer.changeName("John Doe");
    expect(customer.name).toEqual("John Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John");
    const address = new Address("Rua 1", 123, "12345-123", "São Paulo");
    customer.setAddress(address);

    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  });

  it("should throw error when activate customer with undefined address", () => {
    const customer = new Customer("1", "John");

    expect(() => customer.activate()).toThrowError();
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John");

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);
    customer.addRewardPoints(50);
    expect(customer.rewardPoints).toBe(150);
  });
});
