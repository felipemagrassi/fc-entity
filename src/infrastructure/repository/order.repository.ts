import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import OrderItemModel from "../db/sequelize/order-item.model";
import OrderModel from "../db/sequelize/order.model";


export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customer_id,
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
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const allOrderItems = await OrderItemModel.findAll({ where: { order_id: entity.id } })
    const deletedItems = allOrderItems.filter(item => !entity.items.find(entityItem => entityItem.id === item.id))

    try {
      await OrderItemModel.destroy({ where: { id: deletedItems.map((item) => item.id) } })

      entity.items.forEach(async (item) => {
        await OrderItemModel.upsert({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        })
      })

      await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customer_id,
          total: entity.total(),
        },
        { where: { id: entity.id } }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({ where: { id: id }, include: [OrderItemModel] });

      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map((item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id))
      )

      return order

    } catch (error) {
      throw new Error("Order not found")
    }
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: [OrderItemModel] });

    const orders = ordersModel.map((orderModel) => {
      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map((item) => new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id))
      );
      return order;
    });

    return orders;
  }


}
