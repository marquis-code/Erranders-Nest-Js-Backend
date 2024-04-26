import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../authentication/schema/user.schema";
import { Product } from "../../products/schemas/product.schema";

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user: User;

  @Prop({ required: true, default: 0 })
  total: number;

  @Prop({
    default: "pending",
    enum: ["pending", "shipped", "delivered", "cancelled"],
  })
  status: string;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true }
    },
  ])
  products: { product: Types.ObjectId | Product; quantity: number; price: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
