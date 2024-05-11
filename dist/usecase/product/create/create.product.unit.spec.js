"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_product_usecase_1 = __importDefault(require("./create.product.usecase"));
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
};
const input = {
    type: "a",
    name: "product 1",
    price: 20
};
describe("unit tests for create a new Product", () => {
    it("should a create a new Product", async function () {
        const productrepository = new create_product_usecase_1.default(MockRepository());
        const output = await productrepository.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
    it("should throw a error when price is <= 0", async function () {
        input.price = -10;
        const productrepository = new create_product_usecase_1.default(MockRepository());
        await expect(productrepository.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
    it("should throw a error when name invalid", async function () {
        input.name = '';
        const productrepository = new create_product_usecase_1.default(MockRepository());
        await expect(productrepository.execute(input)).rejects.toThrow("Name is required");
    });
});
