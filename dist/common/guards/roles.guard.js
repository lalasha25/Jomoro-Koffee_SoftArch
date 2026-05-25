"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt = __importStar(require("jsonwebtoken"));
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.get('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const headerRole = request.headers['x-user-role'];
        if (headerRole) {
            const roleStr = String(headerRole).toLowerCase();
            const hasRole = requiredRoles.some((role) => role.toLowerCase() === roleStr);
            if (!hasRole) {
                throw new common_1.ForbiddenException('Forbidden resource: You do not have the required role');
            }
            request.user = { role: headerRole };
            return true;
        }
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Unauthorized: Missing or invalid token');
        }
        const token = authHeader.split(' ')[1];
        try {
            const secret = process.env.JWT_SECRET || 'secret';
            const decoded = jwt.verify(token, secret);
            request.user = decoded;
            const userRole = decoded.role;
            if (!userRole) {
                throw new common_1.ForbiddenException('Forbidden: Role not found in token');
            }
            const hasRole = requiredRoles.some((role) => role.toLowerCase() === userRole.toLowerCase());
            if (!hasRole) {
                throw new common_1.ForbiddenException('Forbidden resource: You do not have the required role');
            }
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Unauthorized: Token verification failed');
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map