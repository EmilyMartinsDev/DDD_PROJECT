import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.fatory";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/Product";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";


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

  
  it("should list all products", async () => {
    const productInputCreateOne = {
        type: "a",
        name: "product 1",
        price: 10
    };
    const productInputCreateTwo = {
        type: "a",
        name: "product 2",
        price: 20
    };

    const repository = new ProductRepository();

    const productsCreated = await Promise.all([
        productInputCreateOne,
        productInputCreateTwo
    ].map(async (prod) => {
        const useCaseCreate = new CreateProductUseCase(repository);
        return await useCaseCreate.execute(prod);
    }));

    const useCaseFind = new ListProductUseCase(repository);
    const result = await useCaseFind.execute();

    expect(result.products.length).toBe(2);

    expect(result.products[0].name).toBe(productsCreated[0].name);
    expect(result.products[0].price).toBe(productsCreated[0].price);

    expect(result.products[1].name).toBe(productsCreated[1].name);
    expect(result.products[1].price).toBe(productsCreated[1].price);
});


})