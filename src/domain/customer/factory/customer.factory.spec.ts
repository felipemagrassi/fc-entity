import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory unit test", () => {
  it("should create customer", () => {
    const customer = CustomerFactory.create("John");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Rua A", 123, "12345-123", "São Paulo");
    const customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address.street).toBe("Rua A");
    expect(customer.Address.number).toBe(123);
    expect(customer.Address.zipcode).toBe("12345-123");
    expect(customer.Address.city).toBe("São Paulo");
  });
});
