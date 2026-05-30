import { Controller, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ReduceStockDto } from './dto/reduce-stock.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Admin Products')
@ApiBearerAuth()
@ApiHeader({
  name: 'x-user-role',
  description: 'Mock role header for quick testing/grading (e.g. Admin)',
  required: false,
})
@UseGuards(RolesGuard)
@Roles('Admin')
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new product record (Admin Only)' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation error / Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized: Missing token/header.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Insufficient role.' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Post(':id/update')
  @ApiOperation({ summary: "Update product's details (Admin Only)" })
  @ApiParam({ name: 'id', description: 'Product ID to update', type: Number })
  @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  @ApiResponse({ status: 400, description: 'Validation error / Bad Request.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Post(':id/reduce')
  @ApiOperation({ summary: "Reduce product's quantity (Admin Only)" })
  @ApiParam({ name: 'id', description: 'Product ID to reduce stock', type: Number })
  @ApiResponse({ status: 200, description: 'Stock successfully reduced.' })
  @ApiResponse({ status: 400, description: 'Exceeds stock / Bad Request.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  reduceStock(@Param('id', ParseIntPipe) id: number, @Body() dto: ReduceStockDto) {
    return this.productsService.reduceStock(id, dto.quantity);
  }

  @Post(':id/delete')
  @ApiOperation({ summary: 'Delete product (Admin Only)' })
  @ApiParam({ name: 'id', description: 'Product ID to delete', type: Number })
  @ApiResponse({ status: 200, description: 'Product successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
