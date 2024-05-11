"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../entity/Order"));
const OrderItem_1 = __importDefault(require("../entity/OrderItem"));
class OrderFactory {
    static create(props) {
        const items = props.items.map((item) => {
            return new OrderItem_1.default(item.id, item.name, item.price, item.productId, item.quantity);
        });
        return new Order_1.default(props.id, props.customerId, items);
    }
}
exports.default = OrderFactory;
