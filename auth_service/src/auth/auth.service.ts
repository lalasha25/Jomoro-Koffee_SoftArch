import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(data: RegisterDto) {
    this.checkLetters(data.first_name, 'First name');
    this.checkLetters(data.last_name, 'Last name');

    const validEnds = ['.com', '.net', '.org', '.id'];
    if (!validEnds.some(el => data.email.endsWith(el))) {
      throw new BadRequestException('Email must end with .com, .net, .org, or .id');
    }

    if (data.password.length < 8) throw new BadRequestException('Min 8 characters');
    if (data.password.includes(' ')) throw new BadRequestException('No spaces allowed');
    
    let digits = 0;
    for (const c of data.password) { if (c >= '0' && c <= '9') digits++; }
    if (digits < 2) throw new BadRequestException('Must contain at least 2 numbers');

    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    return this.prisma.user.create({ 
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password, 
        role: data.role
      } 
    });
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
   
    if (!user || data.password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { 
      message: 'Login berhasil',
      access_token: this.jwtService.sign({ sub: user.id, role: user.role }) 
    };
  }

  async getProfile(id: any) {
    return this.prisma.user.findUnique({ 
      where: { 
        id: Number(id)
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true
      }
    });
  }

  private checkLetters(str: string, field: string) {
    for (const char of str) {
      const low = char.toLowerCase();
      if (!(low >= 'a' && low <= 'z')) throw new BadRequestException(`${field} must be letters only`);
    }
  }
}
