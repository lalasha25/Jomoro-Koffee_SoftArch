import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'lilisha@gmail.com' })
    @IsNotEmpty({ message: 'Email tidak boleh kosong' })
    @IsEmail({}, { message: 'Format email tidak valid' })
    email!: string;

    @ApiProperty({ example: 'Password12' })
    @IsNotEmpty({ message: 'Password tidak boleh kosong' })
    @IsString({ message: 'Password harus berupa string' })
    password!: string;
}