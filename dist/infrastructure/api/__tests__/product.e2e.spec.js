"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("../express");
const supertest_1 = __importDefault(require("supertest"));
describe("E2E test for product", () => {
    beforeEach(async () => {
        await express_1.sequelize.sync({ force: true });
    });
    afterAll(async () => {
        await express_1.sequelize.close();
    });
    it("should create a product", async () => {
        const response = await (0, supertest_1.default)(express_1.app)
            .post("/product")
            .send({
            name: "Product 1",
            price: 10,
            type: 'a'
        });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10);
    });
    it("should list all products as XML", async () => {
        // Cria dois produtos para garantir que a listagem funcione corretamente
        await (0, supertest_1.default)(express_1.app)
            .post("/product")
            .send({
            name: "Product 1",
            price: 10,
            type: 'a'
        });
        await (0, supertest_1.default)(express_1.app)
            .post("/product")
            .send({
            name: "Product 2",
            price: 12,
            type: 'a'
        });
        // Faz a requisição para obter a listagem dos produtos em XML
        const listResponseXML = await (0, supertest_1.default)(express_1.app)
            .get("/product")
            .set("Accept", "application/xml")
            .send();
        // Verifica se a resposta foi bem-sucedida (status 200)
        expect(listResponseXML.status).toBe(200);
        // Verifica se o corpo da resposta contém os produtos esperados em XML
        expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
        expect(listResponseXML.text).toContain(`<price>10</price>`);
        expect(listResponseXML.text).toContain(`<name>Product 2</name>`);
        expect(listResponseXML.text).toContain(`<price>12</price>`);
        // Verifica se a estrutura XML está correta contando as ocorrências da tag <product>
    });
});
