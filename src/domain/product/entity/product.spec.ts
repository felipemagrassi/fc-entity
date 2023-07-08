import Product from "./product";

describe("product unit tests", () => {
  it("should throw an error when creating a product without an id", () => {
    expect(() => {
      new Product("", "123", 123);
    }).toThrowError("Product id is required");
  });

  it("should throw an error when creating a product without a name", () => {
    expect(() => {
      new Product("123", "", 123);
    }).toThrowError("Product name is required");
  });

  it("should throw an error when creating a product with negative price", () => {
    expect(() => {
      new Product("123", "123", -1);
    }).toThrowError("Product price cannot be negative");
  });
  it("should change the name of the product", () => {
    const product = new Product("123", "123", 123);
    product.changeName("456");

    expect(product.name).toBe("456");
  });
  it("should change the name of the product", () => {
    const product = new Product("123", "123", 123);
    product.changePrice(1234);

    expect(product.price).toBe(1234);
  });
});
