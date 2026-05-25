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
exports.AdminProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const reduce_stock_dto_1 = require("./dto/reduce-stock.dto");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let AdminProductsController = class AdminProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(dto) {
        return this.productsService.create(dto);
    }
    update(id, dto) {
        return this.productsService.update(id, dto);
    }
    reduceStock(id, dto) {
        return this.productsService.reduceStock(id, dto.quantity);
    }
    delete(id) {
        return this.productsService.delete(id);
    }
};
exports.AdminProductsController = AdminProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product record (Admin Only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Product successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error / Bad Request.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized: Missing token/header.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden: Insufficient role.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], AdminProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    (0, swagger_1.ApiOperation)({ summary: "Update product's details (Admin Only)" }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product ID to update', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error / Bad Request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], AdminProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/reduce'),
    (0, swagger_1.ApiOperation)({ summary: "Reduce product's quantity (Admin Only)" }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product ID to reduce stock', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stock successfully reduced.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Exceeds stock / Bad Request.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, reduce_stock_dto_1.ReduceStockDto]),
    __metadata("design:returntype", void 0)
], AdminProductsController.prototype, "reduceStock", null);
__decorate([
    (0, common_1.Post)(':id/delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete product (Admin Only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Product ID to delete', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Product not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminProductsController.prototype, "delete", null);
exports.AdminProductsController = AdminProductsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Products'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: 'x-user-role',
        description: 'Mock role header for quick testing/grading (e.g. Admin)',
        required: false,
    }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.Controller)('admin/products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], AdminProductsController);
//# sourceMappingURL=admin-products.controller.js.map