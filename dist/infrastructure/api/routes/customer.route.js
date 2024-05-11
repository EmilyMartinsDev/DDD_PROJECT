"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
const express_1 = __importDefault(require("express"));
const create_customer_usecase_1 = __importDefault(require("../../../usecase/customer/create/create.customer.usecase"));
const list_customer_usecase_1 = __importDefault(require("../../../usecase/customer/list/list.customer.usecase"));
const customer_repository_1 = __importDefault(require("../../customer/repository/customer.repository"));
const customer_presenter_1 = __importDefault(require("../presenters/customer.presenter"));
exports.customerRoute = express_1.default.Router();
exports.customerRoute.post("/", async (req, res) => {
    const usecase = new create_customer_usecase_1.default(new customer_repository_1.default());
    try {
        const customerDto = {
            name: req.body.name,
            address: {
                street: req.body.address.street,
                city: req.body.address.city,
                number: req.body.address.number,
                zip: req.body.address.zip,
            },
        };
        const output = await usecase.execute(customerDto);
        res.send(output);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.customerRoute.get("/", async (req, res) => {
    const usecase = new list_customer_usecase_1.default(new customer_repository_1.default());
    const output = await usecase.execute({});
    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(customer_presenter_1.default.listXML(output)),
    });
});
