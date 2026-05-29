import { Controller, Get, Headers, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(@GetUser('id') userId: number) {
    return this.ordersService.getOrders(userId);
  }

  @Post(':id')
  getOrderDetail(@GetUser('id') userId: number, @Param('id', ParseIntPipe) orderId: number) {
    return this.ordersService.getOrderDetail(userId, orderId);
  }

  @Post()
  checkout(@GetUser('id') userId: number, @Headers('authorization') authorization: string) {
    return this.ordersService.checkout(userId, authorization);
  }
}
