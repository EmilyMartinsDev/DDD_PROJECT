import Customer from "../../../domain/customer/entity/customer";
import { MockRepository } from "../../../domain/customer/repository/customer.mock.repository";
import Address from "../../../domain/customer/value-object/address";
import CreateCustomerUseCase from "./create.customer.usecase";


const input = {
    name: "John",
    address: {
      street: "Street",
      number: 123,
      zip: "Zip",
      city: "City",
    },
  };




describe("unit tests for create usecase", function(){
    it("should create a customer", async ()=>{
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    
        const output = await customerCreateUseCase.execute(input);
    
        expect(output).toEqual({
          id: expect.any(String),
          name: input.name,
          address: {
            street: input.address.street,
            number: input.address.number,
            zip: input.address.zip,
            city: input.address.city,
          },
        });
    });
        it("should thrown an error when name is missing", async () => {
            const customerRepository = MockRepository();
            const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        
            input.name = "";
        
            await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
              "Name is required"
            );
          });
        
          it("should thrown an error when street is missing", async () => {
            const customerRepository = MockRepository();
            const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        
            input.address.street = "";
        
            await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
              "Street is required"
            );
          });
})