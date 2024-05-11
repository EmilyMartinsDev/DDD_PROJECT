"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_mock_repository_1 = require("../../../domain/customer/repository/customer.mock.repository");
const create_customer_usecase_1 = __importDefault(require("./create.customer.usecase"));
const input = {
    name: "John",
    address: {
        street: "Street",
        number: 123,
        zip: "Zip",
        city: "City",
    },
};
describe("unit tests for create usecase", function () {
    it("should create a customer", async () => {
        const customerRepository = (0, customer_mock_repository_1.MockRepository)();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
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
        const customerRepository = (0, customer_mock_repository_1.MockRepository)();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });
    it("should thrown an error when street is missing", async () => {
        const customerRepository = (0, customer_mock_repository_1.MockRepository)();
        const customerCreateUseCase = new create_customer_usecase_1.default(customerRepository);
        input.address.street = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("Street is required");
    });
});
