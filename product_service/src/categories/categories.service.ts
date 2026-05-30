import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findProductsByCategory(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId }
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    return this.prisma.product.findMany({
      where: { category_id: categoryId },
      include: { category: true }
    });
  }
}
