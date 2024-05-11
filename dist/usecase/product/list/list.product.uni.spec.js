"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../../domain/product/entity/Product"));
const list_product_usecase_1 = __importDefault(require("./list.product.usecase"));
const product = new Product_1.default("123", "product 1", 20);
const product2 = new Product_1.default("124", "product 2", 30);
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product, product2]),
        create: jest.fn(),
        update: jest.fn(),
    };
};
describe("unit tests for list all  Products", () => {
    it("should a update a product ", async () => {
        const repository = MockRepository();
        const usecase = new list_product_usecase_1.default(repository);
        const result = usecase.execute();
        expect((await result).products.length).toBe(2);
        expect((await result).products[0].id).toBe(product.id);
        expect((await result).products[0].name).toBe(product.name);
        expect((await result).products[0].price).toBe(product.price);
        expect((await result).products[1].id).toBe(product2.id);
        expect((await result).products[1].name).toBe(product2.name);
        expect((await result).products[1].price).toBe(product2.price);
    });
});
