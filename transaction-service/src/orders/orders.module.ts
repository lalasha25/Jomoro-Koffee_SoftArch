import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ProductClientModule } from '../product-client/product-client.module';

@Module({ imports: [ProductClientModule], controllers: [OrdersController], providers: [OrdersService] })
export class OrdersModule {}
