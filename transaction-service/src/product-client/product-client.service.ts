import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductClientService {
  private readonly baseUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002';

  async getProduct(productId: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${productId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) throw new NotFoundException('Product not found');
      throw new BadGatewayException('Product Service is unavailable');
    }
  }

  async reduceStock(productId: number, quantity: number, authorization?: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/admin/products/${productId}/reduce`,
        { quantity },
        { headers: authorization ? { Authorization: authorization } : {} },
      );
      return response.data;
    } catch (error) {
      throw new BadGatewayException(error.response?.data?.message || 'Failed to reduce product stock');
    }
  }
}
