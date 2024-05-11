"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../../domain/product/entity/Product"));
const update_product_usecase_1 = __importDefault(require("./update.product.usecase"));
const product = new Product_1.default("123", "product 1", 20);
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(product),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};
const output = {
    name: product.name,
    price: product.price,
    id: product.id
};
const input = {
    name: product.name,
    price: product.price,
    id: product.id
};
describe("unit tests for update a Product", () => {
    it("should a update a product ", async () => {
        const repository = MockRepository();
        const usecase = new update_product_usecase_1.default(repository);
        const output = await usecase.execute(input);
        expect(output).toEqual(input);
    });
});
