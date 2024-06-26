import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { CustomerModel } from "../../customer/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => require("../../customer/sequelize/customer.model").CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  @BelongsTo(() => require("../../customer/sequelize/customer.model").CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => require("./order-item.model").default)
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}