import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../../customer/sequelize/customer.model";
import OrderModel from "../sequelize/Order.model";
import OrderItemModel from "../sequelize/order-item.model";
import ProductModel from "../../product/sequelize/product.model";
import CustomerRepository from "../../customer/repository/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ProductRepository from "../../product/repository/product.repository";
import Product from "../../../domain/product/entity/Product";
import OrderItem from "../../../domain/checkout/entity/OrderItem";
import Order from "../../../domain/checkout/entity/Order";
import OrderRepository from "./order.repository";



describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: {model:OrderItemModel},
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

  it("should update order ", async ()=>{
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
  

    const product2 = new Product("1234", "Product 2", 20);
    await productRepository.create(product2);
    const orderItemUpd = new OrderItem(
      "1",
      product2.name,
      product2.price,
      product2.id,
      3
    );

    order.alterItens('atualizar',orderItemUpd);


    await orderRepository.update(order);

    const model = await OrderModel.findOne({   where: { id: order.id }, include:{model:OrderItemModel}});
  
    expect(model.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: 60,
      items: [
        {
          id:"1",
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
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
  
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
  
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
  
    const order = new Order("123", "123", [orderItem]);
  
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const resultOrder = await orderRepository.find(order.id);
  
    expect(resultOrder).toBeDefined();
    expect(resultOrder.id).toBe(order.id);
    expect(resultOrder.customerId).toBe(order.customerId);
    expect(resultOrder.items).toEqual(order.items);
    expect(resultOrder.total()).toBe(order.total());
  });
  
  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const customer2 = new Customer("124", "Customer 2");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const address2 = new Address("Street 2", 3, "Zipcode 3", "City 2");
    customer.changeAddress(address);
    customer2.changeAddress(address2);
  
    await customerRepository.create(customer);
    await customerRepository.create(customer2);
  
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
  
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", "123", [orderItem]);
    const order2 = new Order("1234", "124", [orderItem2]);
  
    const orderRepository = new OrderRepository();
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
      const orderRepository = new OrderRepository();
    
      await expect(orderRepository.find("456ABC")).rejects.toThrow("Order not found");
    });
})

