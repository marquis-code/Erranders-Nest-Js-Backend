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
  Res,
  Req,
  HttpStatus,
  NotFoundException
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./schemas/product.schema";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
// import { Query as ExpressQuery } from "express-serve-static-core";
import { FilterProductDTO } from "./dto/filter-product.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  @UseGuards(AuthGuard())
  async createProduct(
    @Body() product: CreateProductDTO,
    @Req() req,
    @Res() res
  ): Promise<Product> {
    return this.productService.addProduct(product, req.user);
  }

  @Get("/")
  async getAllProducts(
    @Query() filterProductDTO: FilterProductDTO
  ): Promise<Product[]> {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(
        filterProductDTO
      );
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @Get("/:id")
  async getProductById(@Param("id") id: string) {

    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException("Product does not exist!");
    return product;
  }

  @Put("/:id")
  @UseGuards(AuthGuard())
  async updateProduct(
    @Body() product: UpdateProductDTO,
    @Param("id") id: string
  ) {
    // return this.productService.updateProduct(product, id);
    const updatedProduct = await this.productService.updateProduct(product, id);
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return updatedProduct;
  }

  @Delete("/:id")
  @UseGuards(AuthGuard())
  async deleteProduct(@Param("id") id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}
