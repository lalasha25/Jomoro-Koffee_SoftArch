import { BadGatewayException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProfileService {
  private readonly authUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

  async getProfile(userId: number, authorization: string) {
    try {
      const response = await axios.get(`${this.authUrl}/profiles`, {
        headers: { Authorization: authorization },
      });
      return response.data;
    } catch (error) {
      return {
        id: userId,
        message: 'Profile endpoint in Auth Service is required for first_name, last_name, email, and role',
      };
    }
  }
}
