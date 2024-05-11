"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_product_usecase_1 = __importDefault(require("../../../usecase/product/create/create.product.usecase"));
const product_repository_1 = __importDefault(require("../../product/repository/product.repository"));
const list_product_usecase_1 = __importDefault(require("../../../usecase/product/list/list.product.usecase"));
const product_presenters_1 = __importDefault(require("../presenters/product.presenters"));
const productRouter = (0, express_1.Router)();
productRouter.post("/", async (req, res) => {
    try {
        const createProductUseCase = new create_product_usecase_1.default(new product_repository_1.default());
        const productDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type || undefined
        };
        const output = await createProductUseCase.execute(productDto);
        res.send(output);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
productRouter.get("/", async (req, res) => {
    const usecase = new list_product_usecase_1.default(new product_repository_1.default());
    const output = await usecase.execute();
    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(product_presenters_1.default.listXML(output)),
    });
});
exports.default = productRouter;
