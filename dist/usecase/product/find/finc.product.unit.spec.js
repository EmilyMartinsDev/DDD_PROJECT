"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../../domain/product/entity/Product"));
const find_product_usecase_1 = require("./find.product.usecase");
const ProductEntity = new Product_1.default("123", "product 1", 10);
const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(ProductEntity),
        findAll: jest.fn(),
        update: jest.fn(),
    };
};
describe("unit tests for find a  Product", () => {
    it("should a find a product", async () => {
        const input = {
            id: "123",
        };
        const output = {
            id: "123",
            name: "product 1",
            price: 10
        };
        const repository = new find_product_usecase_1.FindProductUseCase(MockRepository());
        const result = await repository.execute(input);
        expect(result).toEqual(output);
    });
    it("should throw new Error when not found a product", async () => {
        const input = {
            id: "1",
        };
        const mockrepository = MockRepository();
        mockrepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const repository = new find_product_usecase_1.FindProductUseCase(mockrepository);
        expect(() => {
            return repository.execute(input);
        }).rejects.toThrow("Product not found");
    });
});
