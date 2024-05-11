"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = __importDefault(require("../../../infrastructure/product/sequelize/product.model"));
const product_repository_1 = __importDefault(require("../../../infrastructure/product/repository/product.repository"));
const create_product_usecase_1 = __importDefault(require("../create/create.product.usecase"));
const list_product_usecase_1 = __importDefault(require("./list.product.usecase"));
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
    it("should list all products", async () => {
        const productInputCreateOne = {
            type: "a",
            name: "product 1",
            price: 10
        };
        const productInputCreateTwo = {
            type: "a",
            name: "product 2",
            price: 20
        };
        const repository = new product_repository_1.default();
        const productsCreated = await Promise.all([
            productInputCreateOne,
            productInputCreateTwo
        ].map(async (prod) => {
            const useCaseCreate = new create_product_usecase_1.default(repository);
            return await useCaseCreate.execute(prod);
        }));
        const useCaseFind = new list_product_usecase_1.default(repository);
        const result = await useCaseFind.execute();
        expect(result.products.length).toBe(2);
        expect(result.products[0].name).toBe(productsCreated[0].name);
        expect(result.products[0].price).toBe(productsCreated[0].price);
        expect(result.products[1].name).toBe(productsCreated[1].name);
        expect(result.products[1].price).toBe(productsCreated[1].price);
    });
});
