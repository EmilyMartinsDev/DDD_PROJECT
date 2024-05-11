import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.fatory";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";

import { FindProductUseCase } from "./find.product.usecase";
import Product from "../../../domain/product/entity/Product";
import CreateProductUseCase from "../create/create.product.usecase";


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

  it("should a find a product",async ()=>{
   
      const productInputCreate = {
        type: "a",
        name: "product 1",
        price: 10
      };
   

    const repository = new ProductRepository(); 

    const useCaseCreate = new CreateProductUseCase(repository);
    const product = await useCaseCreate.execute(productInputCreate)  


   const useCaseFind = new FindProductUseCase(repository);

   const result = await useCaseFind.execute({id: product.id});
   expect(result).toEqual({
    id: product.id,
    name:product.name,
    price: product.price
   });


   })
   it("should throw new Error when not found a product",async ()=>{
    const productInputCreate = {
        type: "a",
        name: "product 1",
        price: 10
      };
   

    const repository = new ProductRepository(); 

    const useCaseCreate = new CreateProductUseCase(repository);
    const product = await useCaseCreate.execute(productInputCreate)  


   const useCaseFind = new FindProductUseCase(repository);
   expect(async ()=>{
    return await useCaseFind.execute({id: "1212321"});
}).rejects.toThrow("Product not found");
})

})