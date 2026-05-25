import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
