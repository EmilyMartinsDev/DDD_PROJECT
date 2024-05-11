"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = __importDefault(require("../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
const find_customer_usecase_1 = __importDefault(require("./find.customer.usecase"));
const customer = new customer_1.default("123", "John");
const address = new address_1.default("Street", 123, "Zip", "City");
customer.changeAddress(address);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};
describe("Unit Test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new find_customer_usecase_1.default(customerRepository);
        const input = {
            id: "123",
        };
        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip",
            },
        };
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new find_customer_usecase_1.default(customerRepository);
        const input = {
            id: "123",
        };
        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    });
});
