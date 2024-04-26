import { User } from "../../../authentication/schema/user.schema";
import mongoose from "mongoose";
declare class CategoryDTO {
    name: string;
}
export declare class Product {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stock: number;
    user: User;
    categories: CategoryDTO[];
}
export declare const ProductSchema: mongoose.Schema<mongoose.Document<Product, any, any>, mongoose.Model<mongoose.Document<Product, any, any>, any, any>, undefined, {}>;
export {};
