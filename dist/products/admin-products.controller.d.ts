import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ReduceStockDto } from './dto/reduce-stock.dto';
export declare class AdminProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
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
    reduceStock(id: number, dto: ReduceStockDto): Promise<{
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
