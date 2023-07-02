import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async update(product: Product): Promise<void> {
    await ProductModel.update(
      {
        id: product.id,
        name: product.name,
        price: product.price,
      },
      { where: { id: product.id } }
    );
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map((product) => {
      return new Product(product.id, product.name, product.price);
    });
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });

    return new Product(product.id, product.name, product.price);
  }
}
