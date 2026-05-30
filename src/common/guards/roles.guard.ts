import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // 1. Fallback mode: Check for mock/custom header (perfect for development, testing, and microservices)
    const headerRole = request.headers['x-user-role'];
    if (headerRole) {
      const roleStr = String(headerRole).toLowerCase();
      const hasRole = requiredRoles.some((role) => role.toLowerCase() === roleStr);
      if (!hasRole) {
        throw new ForbiddenException('Forbidden resource: You do not have the required role');
      }
      request.user = { role: headerRole };
      return true;
    }

    // 2. Standard mode: Check for Authorization Bearer Token
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Unauthorized: Missing or invalid token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET || 'secret';
      const decoded = jwt.verify(token, secret) as any;
      request.user = decoded;

      const userRole = decoded.role;
      if (!userRole) {
        throw new ForbiddenException('Forbidden: Role not found in token');
      }

      const hasRole = requiredRoles.some((role) => role.toLowerCase() === userRole.toLowerCase());
      if (!hasRole) {
        throw new ForbiddenException('Forbidden resource: You do not have the required role');
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized: Token verification failed');
    }
  }
}
