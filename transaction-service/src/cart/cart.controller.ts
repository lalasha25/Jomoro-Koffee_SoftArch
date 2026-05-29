import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { AddCartDto } from './dto/add-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartService } from './cart.service';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@GetUser('id') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Post()
  addItem(@GetUser('id') userId: number, @Body() dto: AddCartDto) {
    return this.cartService.addItem(userId, dto);
  }

  @Post(':product_id/update')
  updateItem(@GetUser('id') userId: number, @Param('product_id', ParseIntPipe) productId: number, @Body() dto: UpdateCartDto) {
    return this.cartService.updateItem(userId, productId, dto.quantity);
  }

  @Post(':product_id/delete')
  deleteItem(@GetUser('id') userId: number, @Param('product_id', ParseIntPipe) productId: number) {
    return this.cartService.deleteItem(userId, productId);
  }

  @Post('clear')
  clearCart(@GetUser('id') userId: number) {
    return this.cartService.clearCart(userId);
  }
}
