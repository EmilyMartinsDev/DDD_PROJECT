"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_model_1 = require("../customer/sequelize/customer.model");
const customer_route_1 = require("./routes/customer.route");
const product_model_1 = __importDefault(require("../product/sequelize/product.model"));
const product_route_1 = __importDefault(require("./routes/product.route"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/customer", customer_route_1.customerRoute);
exports.app.use("/product", product_route_1.default);
async function setupDb() {
    exports.sequelize = new sequelize_typescript_1.Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    await exports.sequelize.addModels([customer_model_1.CustomerModel, product_model_1.default]);
    await exports.sequelize.sync();
}
setupDb();
