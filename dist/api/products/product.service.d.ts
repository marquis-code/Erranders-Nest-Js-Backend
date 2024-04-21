import mongoose from "mongoose";
import { Product } from "./schemas/product.schema";
import { Query } from "express-serve-static-core";
import { User } from "../authentication/schema/user.schema";
export declare class ProductService {
    private productModel;
    constructor(productModel: mongoose.Model<Product>);
    handleCreateProduct(product: Product, user: User): Promise<Product>;
    handleGetAllProducts(query: Query): Promise<Product[]>;
    handleGetProductById(id: string): Promise<Product>;
    handleUpdateProduct(product: Product, id: string): Promise<Product>;
    handleDeleteProduct(id: string): Promise<Product>;
}
