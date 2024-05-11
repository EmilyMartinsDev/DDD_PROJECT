"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindProductUseCase = void 0;
class FindProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(input) {
        const product = await this.productRepository.find(input.id);
        return {
            name: product.name,
            id: product.id,
            price: product.price
        };
    }
}
exports.FindProductUseCase = FindProductUseCase;
