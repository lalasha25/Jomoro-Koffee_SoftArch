import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        id: number;
    }[]>;
    findProductsByCategory(categoryId: number): Promise<({
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
}
