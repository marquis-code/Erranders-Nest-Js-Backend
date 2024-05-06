import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./schemas/product.schema";
import { CreateProductDTO } from "./dto/create-product.dto";
import { FilterProductDTO } from "./dto/filter-product.dto";
import { Query } from "express-serve-static-core";
import { User } from "../auth/schema/user.schema";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product")
    private readonly productModel: Model<ProductDocument>
  ) {}

  async getFilteredProducts(
    filterProductDTO: FilterProductDTO
  ): Promise<Product[]> {
    const { category, search } = filterProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search)
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async addProduct(product: Product, user: User): Promise<Product> {
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
  async updateProduct(product: Product, id: string): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { new: true }
    );
    return updatedProduct;
  }
  async deleteProduct(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);
    return deletedProduct;
  }
}
