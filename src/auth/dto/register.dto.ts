import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Budi' })
  first_name!: string;

  @ApiProperty({ example: 'Santoso' })
  last_name!: string;

  @ApiProperty({ example: 'budi@gmail.com' })
  email!: string;

  @ApiProperty({ example: 'Password12', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Password minimal harus 8 karakter' })
  password!: string;

  @ApiProperty({ example: 'Admin', enum: ['Admin', 'Customer'] })
  @IsIn(['Admin', 'Customer'], { message: 'Role harus berupa Admin atau Customer' })
  role!: string;
}