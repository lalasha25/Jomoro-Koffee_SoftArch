import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        category: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        description: string;
        price: number;
        stock: number;
        image_url: string | null;
        category_id: number;
        id: number;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            name: string;
            id: number;
        };
    } & {
        name: string;
        description: string;
        price: number;
        stock: number;
        image_url: string | null;
        category_id: number;
        id: number;
    }>;
    create(dto: CreateProductDto): Promise<{
        message: string;
        product: {
            name: string;
            description: string;
            price: number;
            stock: number;
            image_url: string | null;
            category_id: number;
            id: number;
        };
    }>;
    update(id: number, dto: CreateProductDto): Promise<{
        message: string;
        product: {
            name: string;
            description: string;
            price: number;
            stock: number;
            image_url: string | null;
            category_id: number;
            id: number;
        };
    }>;
    reduceStock(id: number, quantity: number): Promise<{
        message: string;
        product: {
            name: string;
            description: string;
            price: number;
            stock: number;
            image_url: string | null;
            category_id: number;
            id: number;
        };
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
