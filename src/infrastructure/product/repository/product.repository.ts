import Product from "../../../domain/product/entity/Product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "../sequelize/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Product> {
   
    try{
      const productModel = await ProductModel.findByPk(id);
      return new Product(productModel.id, productModel.name, productModel.price);
    }catch(err){
      throw new Error("Product not found")
    }

   
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((productModel) =>
      new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}