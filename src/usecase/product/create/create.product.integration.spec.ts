import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.fatory";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import CreateProductUseCase from "./create.product.usecase";


describe("Test create integration product use case", () => {
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

  it("should create a product ", async () => {
       const input = {
        type: "a",
        name: "product 1",
        price: 20
       }
       const product = ProductFactory.create(input.type, input.name, input.price)
       const repository  = new ProductRepository();
       const useCase =  new CreateProductUseCase(repository);
       const result = await useCase.execute(input)
       
       expect(result).toEqual({
         id: expect.any(String),
         name: input.name,
         price : input.price
       })
  });
});

it("should throw a new error when product price is <= 0", async function(){
  const input = {
    type: "a",
    name: "product 1",
    price: -10
   }

   const repository = new ProductRepository()
   const createProductUseCase = new CreateProductUseCase(repository);

   await expect(createProductUseCase.execute({
    name: input.name,
    price: input.price,
    type: input.type
   })).rejects.toThrow(
    "Price must be greater than zero"
  );
})


it("should throw a new error on there is not a name", async function(){
  const input = {
    type: "a",
    name: "",
    price: 10
   }

   const repository = new ProductRepository()
   const createProductUseCase = new CreateProductUseCase(repository);

   await expect(createProductUseCase.execute({
    name: input.name,
    price: input.price,
    type: input.type
   })).rejects.toThrow(
    "Name is required"
  );
})