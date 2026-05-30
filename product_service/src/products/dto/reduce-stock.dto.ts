import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReduceStockDto {
  @ApiProperty({ description: 'Quantity of stock to reduce', example: 5 })
  @IsInt()
  @Min(1, { message: 'Quantity must at least 1' })
  quantity: number;
}
