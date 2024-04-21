import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./schemas/product.schema";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { Query as ExpressQuery } from "express-serve-static-core";
import { AuthGuard } from "@nestjs/passport";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  @UseGuards(AuthGuard())
  async createProduct(
    @Body() product: CreateProductDTO,
    @Req() req
  ): Promise<Product> {
    return this.productService.handleCreateProduct(product, req.user);
  }

  @Get("/all")
  async getAllProducts(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.handleGetAllProducts(query);
  }

  @Get(":id")
  async getProductById(@Param("id") id: string) {
    return this.productService.handleGetProductById(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard())
  async updateProduct(
    @Body() product: UpdateProductDTO,
    @Param("id") id: string
  ) {
    return this.productService.handleUpdateProduct(product, id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard())
  async deleteProduct(@Param("id") id: string) {
    return this.productService.handleDeleteProduct(id);
  }
}
