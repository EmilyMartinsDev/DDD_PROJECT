import { where } from "sequelize";
import Order from "../../../domain/checkout/entity/Order";
import OrderItem from "../../../domain/checkout/entity/OrderItem";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "../sequelize/Order.model";
import OrderItemModel from "../sequelize/order-item.model";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
      try{
        await OrderModel.create(
          {
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
          },
          {
            include: {model:OrderItemModel}, 
          }
        );
      }catch(err){
        console.log(err)
      }
  }
  async update(entity: Order): Promise<void> {
    try {
      const existingOrder = await OrderModel.findByPk(entity.id);
  
      if (!existingOrder) {
        throw new Error('Order not found.');
      }
  
      await existingOrder.update({
        customer_id: entity.customerId,
        total: entity.total(),
      });
  
      for (const item of entity.items) {
        if (item.id) {
          const existingItem = await OrderItemModel.findByPk(item.id);
          if (existingItem) {
            await existingItem.update({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              product_id: item.productId,
            });
          } else {
            await OrderItemModel.create({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              order_id: entity.id,
              product_id: item.productId,
            });
          }
        } else {
          await OrderItemModel.create({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            order_id: entity.id,
            product_id: item.productId,
          });
        }
      }
  
    } catch (error:any) {
      throw new Error(`Erro ao atualizar o pedido: ${error.message}`);
    }
  }
  async find(id: string): Promise<Order> {
    let order; 
    try{
        order = await OrderModel.findOne({
            where:{
                id
            },
            include:[{model:OrderItemModel}],
            rejectOnEmpty: true,
        })
    }catch(err){
        throw new Error("Order not found ");
    }

    let orderItens = order.items.map(item=>{
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
    })
    const find = new Order(order.id,order.customer_id,orderItens)
    return find

  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: OrderItemModel, // Inclui os itens do pedido
    });
  
    return orders.map((order: OrderModel) => {
      const orderItems = order.items.map((item: OrderItemModel) => {
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      });
  
      return new Order(order.id, order.customer_id, orderItems);
    });
  }
}