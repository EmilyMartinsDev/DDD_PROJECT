"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
class UpdateCustomerUseCase {
    constructor(CustomerRepository) {
        this.CustomerRepository = CustomerRepository;
    }
    async execute(input) {
        const customer = await this.CustomerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new address_1.default(input.address.street, input.address.number, input.address.zip, input.address.city));
        await this.CustomerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            },
        };
    }
}
exports.default = UpdateCustomerUseCase;
