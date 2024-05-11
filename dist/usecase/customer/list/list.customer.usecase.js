"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(input) {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
}
exports.default = ListCustomerUseCase;
class OutputMapper {
    static toOutput(customer) {
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
