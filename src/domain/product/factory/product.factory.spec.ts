import ProductFactory from "./product.factory";

describe("ProductFactory unit test", () => {
  it("should create product type A", () => {
    const product = ProductFactory.createProduct("a", "Product A", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create product type B", () => {
    const product = ProductFactory.createProduct("b", "Product B", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(200);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw error when type is invalid", () => {
    expect(() => {
      ProductFactory.createProduct("c", "Product C", 100);
    }).toThrowError("Invalid product type");
  });
});
