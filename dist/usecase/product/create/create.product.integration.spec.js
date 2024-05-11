"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = __importDefault(require("../../../infrastructure/product/sequelize/product.model"));
const product_fatory_1 = __importDefault(require("../../../domain/product/factory/product.fatory"));
const product_repository_1 = __importDefault(require("../../../infrastructure/product/repository/product.repository"));
const create_product_usecase_1 = __importDefault(require("./create.product.usecase"));
describe("Test create integration product use case", () => {
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
    it("should create a product ", async () => {
        const input = {
            type: "a",
            name: "product 1",
            price: 20
        };
        const product = product_fatory_1.default.create(input.type, input.name, input.price);
        const repository = new product_repository_1.default();
        const useCase = new create_product_usecase_1.default(repository);
        const result = await useCase.execute(input);
        expect(result).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
});
it("should throw a new error when product price is <= 0", async function () {
    const input = {
        type: "a",
        name: "product 1",
        price: -10
    };
    const repository = new product_repository_1.default();
    const createProductUseCase = new create_product_usecase_1.default(repository);
    await expect(createProductUseCase.execute({
        name: input.name,
        price: input.price,
        type: input.type
    })).rejects.toThrow("Price must be greater than zero");
});
it("should throw a new error on there is not a name", async function () {
    const input = {
        type: "a",
        name: "",
        price: 10
    };
    const repository = new product_repository_1.default();
    const createProductUseCase = new create_product_usecase_1.default(repository);
    await expect(createProductUseCase.execute({
        name: input.name,
        price: input.price,
        type: input.type
    })).rejects.toThrow("Name is required");
});
