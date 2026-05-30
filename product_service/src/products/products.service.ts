import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true }
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.category_id }
    });
    if (!category) {
      throw new BadRequestException(`Category with ID ${dto.category_id} does not exist`);
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

  async update(id: number, dto: CreateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const category = await this.prisma.category.findUnique({
      where: { id: dto.category_id }
    });
    if (!category) {
      throw new BadRequestException(`Category with ID ${dto.category_id} does not exist`);
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

  async reduceStock(id: number, quantity: number) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (quantity > product.stock) {
      throw new BadRequestException('Quantity to reduce exceeds current stock');
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

  async delete(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.prisma.product.delete({
      where: { id }
    });

    return {
      message: 'Product successfully deleted'
    };
  }
}
