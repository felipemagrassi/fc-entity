import Product from "../entity/product";
import ProductService from "./product.service";

describe("product service unit tests", () => {
  it("should change the price of all products", () => {
    const product = new Product("1", "product 1", 10);
    const product_2 = new Product("2", "product 2", 20);

    const products = [product, product_2];

    ProductService.changePrice(products, 10);

    expect(product.price).toBe(11);
    expect(product_2.price).toBe(22);
  });
});
