"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../../domain/checkout/entity/Order"));
const OrderItem_1 = __importDefault(require("../../../domain/checkout/entity/OrderItem"));
const Order_model_1 = __importDefault(require("../sequelize/Order.model"));
const order_item_model_1 = __importDefault(require("../sequelize/order-item.model"));
class OrderRepository {
    async create(entity) {
        try {
            await Order_model_1.default.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            }, {
                include: { model: order_item_model_1.default },
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async update(entity) {
        try {
            const existingOrder = await Order_model_1.default.findByPk(entity.id);
            if (!existingOrder) {
                throw new Error('Order not found.');
            }
            await existingOrder.update({
                customer_id: entity.customerId,
                total: entity.total(),
            });
            for (const item of entity.items) {
                if (item.id) {
                    const existingItem = await order_item_model_1.default.findByPk(item.id);
                    if (existingItem) {
                        await existingItem.update({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            product_id: item.productId,
                        });
                    }
                    else {
                        await order_item_model_1.default.create({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            order_id: entity.id,
                            product_id: item.productId,
                        });
                    }
                }
                else {
                    await order_item_model_1.default.create({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        order_id: entity.id,
                        product_id: item.productId,
                    });
                }
            }
        }
        catch (error) {
            throw new Error(`Erro ao atualizar o pedido: ${error.message}`);
        }
    }
    async find(id) {
        let order;
        try {
            order = await Order_model_1.default.findOne({
                where: {
                    id
                },
                include: [{ model: order_item_model_1.default }],
                rejectOnEmpty: true,
            });
        }
        catch (err) {
            throw new Error("Order not found ");
        }
        let orderItens = order.items.map(item => {
            return new OrderItem_1.default(item.id, item.name, item.price, item.product_id, item.quantity);
        });
        const find = new Order_1.default(order.id, order.customer_id, orderItens);
        return find;
    }
    async findAll() {
        const orders = await Order_model_1.default.findAll({
            include: order_item_model_1.default, // Inclui os itens do pedido
        });
        return orders.map((order) => {
            const orderItems = order.items.map((item) => {
                return new OrderItem_1.default(item.id, item.name, item.price, item.product_id, item.quantity);
            });
            return new Order_1.default(order.id, order.customer_id, orderItems);
        });
    }
}
exports.default = OrderRepository;
