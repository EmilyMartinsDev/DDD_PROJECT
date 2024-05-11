"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_factory_1 = __importDefault(require("../../../domain/customer/factory/customer.factory"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
class CreateCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(inputData) {
        const customer = customer_factory_1.default.createWithAddress(inputData.name, new address_1.default(inputData.address.street, inputData.address.number, inputData.address.zip, inputData.address.city));
        const output = await this.customerRepository.create(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address._street,
                city: customer.Address._city,
                number: customer.Address._number,
                zip: customer.Address._zip
            }
        };
    }
}
exports.default = CreateCustomerUseCase;
