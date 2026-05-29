import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ProductClientModule } from './product-client/product-client.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.JWT_SECRET || 'jomoro_secret' }),
    PrismaModule,
    ProductClientModule,
    CartModule,
    OrdersModule,
    ProfileModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
