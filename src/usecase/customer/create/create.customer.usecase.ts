import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { IInputCreateCustomerDTO, IOutputCreateCustomerDTO } from "./create.customer.dto";

export default class CreateCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface
    constructor(customerRepository:CustomerRepositoryInterface){
        this.customerRepository = customerRepository
    }

    async execute(inputData:IInputCreateCustomerDTO): Promise<IOutputCreateCustomerDTO>{
       const customer = CustomerFactory.createWithAddress(
        inputData.name, 
        new Address(
            inputData.address.street,
            inputData.address.number,
            inputData.address.zip,
            inputData.address.city
        )
      
       );
       const output = await this.customerRepository.create(customer);
       return {
        id: customer.id,
        name: customer.name,
        address:{
            street: customer.Address._street,
            city: customer.Address._city,
            number: customer.Address._number,
            zip: customer.Address._zip
        }
       }

      
    }
}