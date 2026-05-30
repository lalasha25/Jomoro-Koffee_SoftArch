import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  @ApiOperation({ summary: 'List all categories' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all categories.' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':categoryId/products')
  @ApiOperation({ summary: 'Filter products by Category ID' })
  @ApiParam({ name: 'categoryId', description: 'Numeric ID of the category', type: Number })
  @ApiResponse({ status: 200, description: 'Successfully retrieved products belonging to the category.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findProductsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findProductsByCategory(categoryId);
  }
}
