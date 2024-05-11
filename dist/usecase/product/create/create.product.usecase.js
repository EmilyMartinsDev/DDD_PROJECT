"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../../domain/product/entity/Product"));
const product_fatory_1 = __importDefault(require("../../../domain/product/factory/product.fatory"));
class CreateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(input) {
        const Instanceproduct = product_fatory_1.default.create(input.type, input.name, input.price);
        await this.productRepository.create(new Product_1.default(Instanceproduct.id, Instanceproduct.name, Instanceproduct.price));
        return {
            id: Instanceproduct.id,
            name: Instanceproduct.name,
            price: Instanceproduct.price
        };
    }
}
exports.default = CreateProductUseCase;
