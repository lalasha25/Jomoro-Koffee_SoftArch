import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductClientService } from '../product-client/product-client.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productClient: ProductClientService,
  ) {}

  async getOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      include: { order_details: true },
    });
  }

  async getOrderDetail(userId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, user_id: userId },
      include: { order_details: true },
    });

    if (!order) throw new NotFoundException('Order not found');

    const details = await Promise.all(
      order.order_details.map(async (detail) => {
        const product = await this.productClient.getProduct(detail.product_id);
        return {
          product_id: detail.product_id,
          name: product.name,
          quantity: detail.quantity,
          price: detail.price,
          subtotal: detail.price * detail.quantity,
        };
      }),
    );

    return {
      order_id: order.id,
      created_at: order.created_at,
      details,
      total: details.reduce((sum, item) => sum + item.subtotal, 0),
    };
  }

  async checkout(userId: number, authorization: string) {
    const cart = await this.prisma.cart.findUnique({
      where: { user_id: userId },
      include: { cart_items: true },
    });

    if (!cart || cart.cart_items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const productSnapshots = [];

    for (const item of cart.cart_items) {
      const product = await this.productClient.getProduct(item.product_id);
      if (item.quantity > product.stock) {
        throw new BadRequestException(`Insufficient stock for product ID ${item.product_id}`);
      }
      productSnapshots.push({ item, product });
    }

    const order = await this.prisma.order.create({
      data: { user_id: userId },
    });

    for (const snapshot of productSnapshots) {
      await this.prisma.orderDetail.create({
        data: {
          order_id: order.id,
          product_id: snapshot.item.product_id,
          price: Number(snapshot.product.price),
          quantity: snapshot.item.quantity,
        },
      });

      await this.productClient.reduceStock(
        snapshot.item.product_id,
        snapshot.item.quantity,
        authorization,
      );
    }

    await this.prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });

    return { message: 'Checkout successful', order_id: order.id };
  }
}
