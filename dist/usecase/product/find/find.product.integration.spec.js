"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = __importDefault(require("../../../infrastructure/product/sequelize/product.model"));
const product_repository_1 = __importDefault(require("../../../infrastructure/product/repository/product.repository"));
const find_product_usecase_1 = require("./find.product.usecase");
const create_product_usecase_1 = __importDefault(require("../create/create.product.usecase"));
describe("Test find integration product use case", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([product_model_1.default]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it("should a find a product", async () => {
        const productInputCreate = {
            type: "a",
            name: "product 1",
            price: 10
        };
        const repository = new product_repository_1.default();
        const useCaseCreate = new create_product_usecase_1.default(repository);
        const product = await useCaseCreate.execute(productInputCreate);
        const useCaseFind = new find_product_usecase_1.FindProductUseCase(repository);
        const result = await useCaseFind.execute({ id: product.id });
        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
    it("should throw new Error when not found a product", async () => {
        const productInputCreate = {
            type: "a",
            name: "product 1",
            price: 10
        };
        const repository = new product_repository_1.default();
        const useCaseCreate = new create_product_usecase_1.default(repository);
        const product = await useCaseCreate.execute(productInputCreate);
        const useCaseFind = new find_product_usecase_1.FindProductUseCase(repository);
        expect(async () => {
            return await useCaseFind.execute({ id: "1212321" });
        }).rejects.toThrow("Product not found");
    });
});
