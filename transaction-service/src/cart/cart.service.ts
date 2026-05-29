import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductClientService } from '../product-client/product-client.service';
import { AddCartDto } from './dto/add-cart.dto';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productClient: ProductClientService,
  ) {}

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { user_id: userId },
      include: { cart_items: true },
    });

    if (!cart) return { message: 'Cart is empty', items: [] };

    const items = await Promise.all(
      cart.cart_items.map(async (item) => {
        const product = await this.productClient.getProduct(item.product_id);
        return {
          product_id: item.product_id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal: Number(product.price) * item.quantity,
        };
      }),
    );

    return {
      cart_id: cart.id,
      items,
      total: items.reduce((sum, item) => sum + item.subtotal, 0),
    };
  }

  async addItem(userId: number, dto: AddCartDto) {
    const product = await this.productClient.getProduct(dto.product_id);

    if (dto.quantity > product.stock) {
      throw new BadRequestException('Requested quantity exceeds product stock');
    }

    const cart = await this.prisma.cart.upsert({
      where: { user_id: userId },
      update: {},
      create: { user_id: userId },
    });

    const existingItem = await this.prisma.cartItem.findUnique({
      where: { cart_id_product_id: { cart_id: cart.id, product_id: dto.product_id } },
    });

    if (existingItem) {
      throw new BadRequestException('Product already exists in cart');
    }

    await this.prisma.cartItem.create({
      data: { cart_id: cart.id, product_id: dto.product_id, quantity: dto.quantity },
    });

    return { message: 'Product added to cart successfully' };
  }

  async updateItem(userId: number, productId: number, quantity: number) {
    const product = await this.productClient.getProduct(productId);

    if (quantity > product.stock) {
      throw new BadRequestException('Requested quantity exceeds product stock');
    }

    const cart = await this.prisma.cart.findUnique({ where: { user_id: userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findUnique({
      where: { cart_id_product_id: { cart_id: cart.id, product_id: productId } },
    });
    if (!item) throw new NotFoundException('Product not found in cart');

    await this.prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });

    return { message: 'Cart item updated successfully' };
  }

  async deleteItem(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { user_id: userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findUnique({
      where: { cart_id_product_id: { cart_id: cart.id, product_id: productId } },
    });
    if (!item) throw new NotFoundException('Product not found in cart');

    await this.prisma.cartItem.delete({ where: { id: item.id } });
    return { message: 'Product deleted from cart successfully' };
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { user_id: userId } });
    if (!cart) return { message: 'Cart cleared successfully' };

    await this.prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });
    return { message: 'Cart cleared successfully' };
  }
}
