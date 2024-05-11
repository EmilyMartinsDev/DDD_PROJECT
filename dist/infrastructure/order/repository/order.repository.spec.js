"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const customer_model_1 = require("../../customer/sequelize/customer.model");
const Order_model_1 = __importDefault(require("../sequelize/Order.model"));
const order_item_model_1 = __importDefault(require("../sequelize/order-item.model"));
const product_model_1 = __importDefault(require("../../product/sequelize/product.model"));
const customer_repository_1 = __importDefault(require("../../customer/repository/customer.repository"));
const customer_1 = __importDefault(require("../../../domain/customer/entity/customer"));
const address_1 = __importDefault(require("../../../domain/customer/value-object/address"));
const product_repository_1 = __importDefault(require("../../product/repository/product.repository"));
const Product_1 = __importDefault(require("../../../domain/product/entity/Product"));
const OrderItem_1 = __importDefault(require("../../../domain/checkout/entity/OrderItem"));
const Order_1 = __importDefault(require("../../../domain/checkout/entity/Order"));
const order_repository_1 = __importDefault(require("./order.repository"));
describe("Order repository test", () => {
    let sequelize;
    beforeEach(async () => {
        sequelize = new sequelize_typescript_1.Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([
            customer_model_1.CustomerModel,
            Order_model_1.default,
            order_item_model_1.default,
            product_model_1.default,
        ]);
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a new order", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "Customer 1");
        const address = new address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem_1.default("1", product.name, product.price, product.id, 2);
        const order = new Order_1.default("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        const orderModel = await Order_model_1.default.findOne({
            where: { id: order.id },
            include: { model: order_item_model_1.default },
        });
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });
    it("should update order ", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "Customer 1");
        const address = new address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem_1.default("1", product.name, product.price, product.id, 2);
        const order = new Order_1.default("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        const product2 = new Product_1.default("1234", "Product 2", 20);
        await productRepository.create(product2);
        const orderItemUpd = new OrderItem_1.default("1", product2.name, product2.price, product2.id, 3);
        order.alterItens('atualizar', orderItemUpd);
        await orderRepository.update(order);
        const model = await Order_model_1.default.findOne({ where: { id: order.id }, include: { model: order_item_model_1.default } });
        expect(model.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: 60,
            items: [
                {
                    id: "1",
                    product_id: "1234",
                    order_id: "123",
                    quantity: 3,
                    name: "Product 2",
                    price: 20,
                },
            ],
        });
    });
    it("should find a order", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "Customer 1");
        const address = new address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem_1.default("1", product.name, product.price, product.id, 2);
        const order = new Order_1.default("123", "123", [orderItem]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        const resultOrder = await orderRepository.find(order.id);
        expect(resultOrder).toBeDefined();
        expect(resultOrder.id).toBe(order.id);
        expect(resultOrder.customerId).toBe(order.customerId);
        expect(resultOrder.items).toEqual(order.items);
        expect(resultOrder.total()).toBe(order.total());
    });
    it("should find all orders", async () => {
        const customerRepository = new customer_repository_1.default();
        const customer = new customer_1.default("123", "Customer 1");
        const customer2 = new customer_1.default("124", "Customer 2");
        const address = new address_1.default("Street 1", 1, "Zipcode 1", "City 1");
        const address2 = new address_1.default("Street 2", 3, "Zipcode 3", "City 2");
        customer.changeAddress(address);
        customer2.changeAddress(address2);
        await customerRepository.create(customer);
        await customerRepository.create(customer2);
        const productRepository = new product_repository_1.default();
        const product = new Product_1.default("123", "Product 1", 10);
        await productRepository.create(product);
        const orderItem = new OrderItem_1.default("1", product.name, product.price, product.id, 2);
        const orderItem2 = new OrderItem_1.default("2", product.name, product.price, product.id, 2);
        const order = new Order_1.default("123", "123", [orderItem]);
        const order2 = new Order_1.default("1234", "124", [orderItem2]);
        const orderRepository = new order_repository_1.default();
        await orderRepository.create(order);
        await orderRepository.create(order2);
        const orders = await orderRepository.findAll();
        expect(orders).toHaveLength(2);
        expect(orders[0].id).toBe(order.id);
        expect(orders[1].id).toBe(order2.id);
        expect(orders[0].customerId).toBe(order.customerId);
        expect(orders[1].customerId).toBe(order2.customerId);
        expect(orders[0].items).toEqual(order.items);
        expect(orders[1].items).toEqual(order2.items);
        expect(orders[0].total()).toBe(order.total());
        expect(orders[1].total()).toBe(order2.total());
    });
    it("should throw an error when order is not found", async () => {
        const orderRepository = new order_repository_1.default();
        await expect(orderRepository.find("456ABC")).rejects.toThrow("Order not found");
    });
});
