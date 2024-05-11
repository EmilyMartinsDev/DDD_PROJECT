import Product from "../../../domain/product/entity/Product";
import UpdateProductUseCase from "./update.product.usecase";
const product = new Product("123", "product 1", 20);
const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(product),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };
  const output = {
    name: product.name,
    price: product.price,
    id: product.id
   }
   const input = {
    name: product.name,
    price: product.price,
    id: product.id
  }

describe("unit tests for update a Product", ()=>{
    it("should a update a product ", async ()=>{     
       const repository = MockRepository();
       const usecase = new UpdateProductUseCase(repository)
       const output = await usecase.execute(input);
        expect(output).toEqual(input)
    })
})

