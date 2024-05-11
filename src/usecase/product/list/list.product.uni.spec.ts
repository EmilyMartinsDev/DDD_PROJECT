import Product from "../../../domain/product/entity/Product";
import ListProductUseCase from "./list.product.usecase";




const product = new Product("123", "product 1", 20);
const product2 = new Product("124", "product 2", 30);
const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue([product, product2]),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("unit tests for list all  Products", ()=>{
    it("should a update a product ", async ()=>{     
       const repository = MockRepository();
       const usecase = new ListProductUseCase(repository);
       const result = usecase.execute();
       expect((await result).products.length).toBe(2);
       expect((await result).products[0].id).toBe(product.id);
       expect((await result).products[0].name).toBe(product.name);
       expect((await result).products[0].price).toBe(product.price);
       expect((await result).products[1].id).toBe(product2.id);
       expect((await result).products[1].name).toBe(product2.name);
       expect((await result).products[1].price).toBe(product2.price);
    })
})

