import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsIn, IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'lilisha' })
  @IsString({ message: 'First name harus berupa string' })
  first_name!: string;

  @ApiProperty({ example: 'satoru' })
  @IsString({ message: 'Last name harus berupa string' })
  last_name!: string;

  @ApiProperty({ example: 'lilisha@gmail.com' })
  @IsString()
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;

  @ApiProperty({ example: 'Password12', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Password minimal harus 8 karakter' })
  password!: string;

  @ApiProperty({ example: 'Admin', enum: ['Admin', 'Customer'] })
  @IsIn(['Admin', 'Customer'], { message: 'Role harus berupa Admin atau Customer' })
  role!: string;
}
