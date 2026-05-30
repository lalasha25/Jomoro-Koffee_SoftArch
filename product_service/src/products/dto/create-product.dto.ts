import { IsString, IsNotEmpty, IsInt, Min, Max, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsAtLeastThreeWords } from '../../common/validators/at-least-three-words.validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name (must contain at least 3 words)', example: 'lilisa satoru fushiguro' })
  @IsString()
  @IsNotEmpty()
  @IsAtLeastThreeWords({ message: 'Product name must  be at least 3 words' })
  name: string;

  @ApiProperty({ description: 'Product description (at least 20 characters)', example: 'A beautifully crafted ceramic coffee mug for your daily caffeine needs.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'Product description must have at least 20 characters' })
  description: string;

  @ApiProperty({ description: 'Product price(must be positive integer, at least 1)', example: 250000 })
  @IsInt()
  @Min(1, { message: 'Price must be at least 1' })
  price: number;

  @ApiProperty({ description: 'Product stock (must be between 0 and 999)', example: 50 })
  @IsInt()
  @Min(0, { message: 'Stock must be at least 0' })
  @Max(999, { message: 'Stock cannot exceed 999' })
  stock: number;

  @ApiProperty({ description: 'Product image URL (optional)', example: 'https://i.pinimg.com/1200x/3b/e8/2c/3be82cc8fadeb7c11a152f1cd06fb332.jpg', required: false })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiProperty({ description: 'Existing Category ID', example: 1 })
  @IsInt()
  @Min(1)
  category_id: number;
}
