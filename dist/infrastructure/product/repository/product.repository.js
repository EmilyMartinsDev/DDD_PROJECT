"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../../../domain/product/entity/Product"));
const product_model_1 = __importDefault(require("../sequelize/product.model"));
class ProductRepository {
    async create(entity) {
        await product_model_1.default.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }
    async update(entity) {
        await product_model_1.default.update({
            name: entity.name,
            price: entity.price,
        }, {
            where: {
                id: entity.id,
            },
        });
    }
    async find(id) {
        try {
            const productModel = await product_model_1.default.findByPk(id);
            return new Product_1.default(productModel.id, productModel.name, productModel.price);
        }
        catch (err) {
            throw new Error("Product not found");
        }
    }
    async findAll() {
        const productModels = await product_model_1.default.findAll();
        return productModels.map((productModel) => new Product_1.default(productModel.id, productModel.name, productModel.price));
    }
}
exports.default = ProductRepository;
