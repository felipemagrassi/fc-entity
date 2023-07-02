import Customer from "./customer";
import Address from "./address";

describe("Customer unit tests", () => {
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
