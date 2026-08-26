import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHealthcheck() {
    return {
      status: 'ok',
      version: '0.0.1',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
