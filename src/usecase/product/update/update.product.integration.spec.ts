import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.fatory";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/Product";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";


describe("Test find integration product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  
  it("should update a product", async () => {
    
    const repository = new ProductRepository();
    const inputCreate = {
        type: "a",
        name: "product 1",
        price: 10,

    }
    const createUseCase =  new CreateProductUseCase(repository);
    const updateUseCase =  new UpdateProductUseCase(repository);

    const {id, name, price} = await createUseCase.execute(inputCreate);

    const productCreated = new Product(id,name,price);

    productCreated.changePrice(20);
    const result = await updateUseCase.execute({
        id: productCreated.id,
        name: productCreated.name,
        price: productCreated.price
    });

    expect(result).toEqual({
        id: productCreated.id,
        name: productCreated.name,
        price:  productCreated.price
    })
})
})