import Customer from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";

import { IInputListCustomerDTO, IOutputListCustomer } from "./list.customer.dto";

export default class ListCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface
    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository = customerRepository
    }

    async execute(input: IInputListCustomerDTO): Promise<IOutputListCustomer> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
      }
    }
    
    class OutputMapper {
      static toOutput(customer: Customer[]): IOutputListCustomer {
        return {
          customers: customer.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.Address.street,
              number: customer.Address.number,
              zip: customer.Address.zip,
              city: customer.Address.city,
            },
          })),
        };
      }
}