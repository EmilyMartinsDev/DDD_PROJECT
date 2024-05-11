"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FindCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(input) {
        const customer = await this.customerRepository.find(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip,
            },
        };
    }
}
exports.default = FindCustomerUseCase;
