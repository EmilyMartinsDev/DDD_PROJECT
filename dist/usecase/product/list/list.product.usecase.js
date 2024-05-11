"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute() {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}
exports.default = ListProductUseCase;
class OutputMapper {
    static toOutput(product) {
        return {
            products: product.map(product => ({
                name: product.name,
                price: product.price,
                id: product.id
            }))
        };
    }
}
