"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("./Product"));
describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product_1.default("", "Product 1", 100);
        }).toThrowError("Id is required");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product_1.default("123", "", 100);
        }).toThrowError("Name is required");
    });
    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product_1.default("123", "Name", -1);
        }).toThrowError("Price must be greater than zero");
    });
    it("should change name", () => {
        const product = new Product_1.default("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });
    it("should change price", () => {
        const product = new Product_1.default("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});
