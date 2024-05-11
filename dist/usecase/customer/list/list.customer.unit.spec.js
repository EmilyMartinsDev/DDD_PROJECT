"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_factory_1 = __importDefault(require("../../../domain/customer/factory/customer.factory"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
const list_customer_usecase_1 = __importDefault(require("./list.customer.usecase"));
const customer1 = customer_factory_1.default.createWithAddress("John Doe", new address_1.default("Street 1", 1, "12345", "City"));
const customer2 = customer_factory_1.default.createWithAddress("Jane Doe", new address_1.default("Street 2", 2, "123456", "City 2"));
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    };
};
describe("unit tests for list customers", () => {
    it("should list customers all", async function () {
        const customerUseCase = new list_customer_usecase_1.default(MockRepository());
        const output = await customerUseCase.execute({});
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });
});
