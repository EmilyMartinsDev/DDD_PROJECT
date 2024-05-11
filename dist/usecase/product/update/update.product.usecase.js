"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(input) {
        const product = await this.productRepository.find(input.id);
        console.log("AAAAAAAAAAAAAAAAAAAAAA");
        console.log(product);
        await this.productRepository.update(product);
        return {
            id: input.id,
            name: input.name,
            price: input.price
        };
    }
}
exports.default = UpdateProductUseCase;
