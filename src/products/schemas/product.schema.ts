import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schema/user.schema";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type ProductDocument = Product & Document;
@Schema({
  timestamps: true,
})
// class CategoryDTO {
//   name: string;
// }
export class Product {
  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop({ default: 0 })
  price: number;

  @Prop()
  imageUrl?: string;

  @Prop({ default: 0 })
  stock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @Prop()
  category: string;
  // categories: CategoryDTO[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
