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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.product.findMany({
            include: { category: true }
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async create(dto) {
        const category = await this.prisma.category.findUnique({
            where: { id: dto.category_id }
        });
        if (!category) {
            throw new common_1.BadRequestException(`Category with ID ${dto.category_id} does not exist`);
        }
        const product = await this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                stock: dto.stock,
                image_url: dto.image_url || null,
                category_id: dto.category_id
            }
        });
        return {
            message: 'Product successfully created',
            product
        };
    }
    async update(id, dto) {
        const product = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        const category = await this.prisma.category.findUnique({
            where: { id: dto.category_id }
        });
        if (!category) {
            throw new common_1.BadRequestException(`Category with ID ${dto.category_id} does not exist`);
        }
        const updatedProduct = await this.prisma.product.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                stock: dto.stock,
                image_url: dto.image_url || null,
                category_id: dto.category_id
            }
        });
        return {
            message: 'Product successfully updated',
            product: updatedProduct
        };
    }
    async reduceStock(id, quantity) {
        const product = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        if (quantity > product.stock) {
            throw new common_1.BadRequestException('Quantity to reduce exceeds current stock');
        }
        const updatedProduct = await this.prisma.product.update({
            where: { id },
            data: {
                stock: product.stock - quantity
            }
        });
        return {
            message: 'Product quantity successfully reduced',
            product: updatedProduct
        };
    }
    async delete(id) {
        const product = await this.prisma.product.findUnique({
            where: { id }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.prisma.product.delete({
            where: { id }
        });
        return {
            message: 'Product successfully deleted'
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map