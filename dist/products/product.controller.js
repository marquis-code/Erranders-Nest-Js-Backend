"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const passport_1 = require("@nestjs/passport");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(product, req, res) {
        try {
            console.log(req, 'uere');
            const newProduct = await this.productService.handleCreateProduct(product, req.user);
            return res.status(common_1.HttpStatus.CREATED).json({
                message: "Product has been created successfully",
                newProduct,
            });
        }
        catch (err) {
            console.log(err, 'error message');
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: "Error: Product not created!",
                error: "Bad Request",
            });
        }
    }
    async getAllProducts(query) {
        return this.productService.handleGetAllProducts(query);
    }
    async getProductById(id) {
        return this.productService.handleGetProductById(id);
    }
    async updateProduct(product, id) {
        return this.productService.handleUpdateProduct(product, id);
    }
    async deleteProduct(id) {
        return this.productService.handleDeleteProduct(id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)("/all"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Put)("/:id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_dto_1.UpdateProductDTO, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)("product"),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map