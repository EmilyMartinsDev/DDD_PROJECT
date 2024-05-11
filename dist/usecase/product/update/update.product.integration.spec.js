"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = __importDefault(require("../../../infrastructure/product/sequelize/product.model"));
const product_repository_1 = __importDefault(require("../../../infrastructure/product/repository/product.repository"));
const Product_1 = __importDefault(require("../../../domain/product/entity/Product"));
const create_product_usecase_1 = __importDefault(require("../create/create.product.usecase"));
const update_product_usecase_1 = __importDefault(require("./update.product.usecase"));
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
    it("should update a product", async () => {
        const repository = new product_repository_1.default();
        const inputCreate = {
            type: "a",
            name: "product 1",
            price: 10,
        };
        const createUseCase = new create_product_usecase_1.default(repository);
        const updateUseCase = new update_product_usecase_1.default(repository);
        const { id, name, price } = await createUseCase.execute(inputCreate);
        const productCreated = new Product_1.default(id, name, price);
        productCreated.changePrice(20);
        const result = await updateUseCase.execute({
            id: productCreated.id,
            name: productCreated.name,
            price: productCreated.price
        });
        expect(result).toEqual({
            id: productCreated.id,
            name: productCreated.name,
            price: productCreated.price
        });
    });
});
