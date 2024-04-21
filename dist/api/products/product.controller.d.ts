import { ProductService } from "./product.service";
import { Product } from "./schemas/product.schema";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { Query as ExpressQuery } from "express-serve-static-core";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(product: CreateProductDTO, req: any): Promise<Product>;
    getAllProducts(query: ExpressQuery): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    updateProduct(product: UpdateProductDTO, id: string): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
