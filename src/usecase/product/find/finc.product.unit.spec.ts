import Product from "../../../domain/product/entity/Product";
import ProductFactory from "../../../domain/product/factory/product.fatory"
import { FindProductUseCase } from "./find.product.usecase";



const ProductEntity = new Product("123","product 1", 10)
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(ProductEntity),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit tests for find a  Product", ()=>{
   it("should a find a product",async ()=>{
    const input = {
        id: "123",
      };
  
      const output = {
        id: "123",
        name: "product 1",
        price: 10
      };
   const repository = new FindProductUseCase(MockRepository());
   const result = await repository.execute(input);
   expect(result).toEqual(output);
   })

   it("should throw new Error when not found a product",async ()=>{
    const input = {
        id: "1",
      };
     const mockrepository = MockRepository()
     mockrepository.find.mockImplementation(()=>{
        throw new Error("Product not found")
     })

   const repository = new FindProductUseCase(mockrepository);

      expect(()=>{
        return repository.execute(input);
    }).rejects.toThrow("Product not found");
})
})

