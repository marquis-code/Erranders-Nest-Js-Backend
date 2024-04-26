import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "./schemas/product.schema";
import { Query } from "express-serve-static-core";
import { User } from "../authentication/schema/user.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>
  ) {}

  async handleCreateProduct(product: Product, user: User): Promise<Product> {
    const data = Object.assign(product, { user: user._id });
    return await this.productModel.create(data);
  }
  async handleGetAllProducts(query: Query): Promise<Product[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: "i",
          },
        }
      : {};
    return await this.productModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
  }
  async handleGetProductById(id: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException("Please enter a correct product id.");
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }
  async handleUpdateProduct(product: Product, id: string): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product);
  }
  async handleDeleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
