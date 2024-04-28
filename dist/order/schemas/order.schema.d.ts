import { Document, Types } from "mongoose";
import { User } from "../../authentication/schema/user.schema";
import { Product } from "../../products/schemas/product.schema";
export type OrderDocument = Order & Document;
export declare class Order {
    user: User;
    total: number;
    status: string;
    products: {
        product: Types.ObjectId | Product;
        quantity: number;
        price: number;
    }[];
}
export declare const OrderSchema: import("mongoose").Schema<Document<Order, any, any>, import("mongoose").Model<Document<Order, any, any>, any, any>, undefined, {}>;
