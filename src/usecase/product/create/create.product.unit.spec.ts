import CreateProductUseCase from "./create.product.usecase";




const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

const input ={
    type: "a",
    name: "product 1",
    price: 20
}

describe("unit tests for create a new Product", ()=>{
    it("should a create a new Product", async function(){
   
        const productrepository = new CreateProductUseCase(MockRepository());
        const output = await productrepository.execute(input);
        expect(output).toEqual({
            id:expect.any(String),
            name: input.name,
            price: input.price
        })
    });


    it("should throw a error when price is <= 0", async  function(){
        input.price = -10;   
       const productrepository = new CreateProductUseCase(MockRepository());
       await expect(productrepository.execute(input)).rejects.toThrow(
           "Price must be greater than zero"
         );
   })
   
   it("should throw a error when name invalid", async function(){
       input.name = '';   
       const productrepository = new CreateProductUseCase(MockRepository());
       await expect(productrepository.execute(input)).rejects.toThrow(
           "Name is required"
         );
   })
})

