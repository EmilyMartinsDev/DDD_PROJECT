"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../entity/Product"));
const Product_b_1 = __importDefault(require("../entity/Product-b"));
const uuid_1 = require("uuid");
class ProductFactory {
    static create(type, name, price) {
        switch (type) {
            case "a":
                return new Product_1.default((0, uuid_1.v4)(), name, price);
            case "b":
                return new Product_b_1.default((0, uuid_1.v4)(), name, price);
            default:
                throw new Error("Product type not supported");
        }
    }
}
exports.default = ProductFactory;
