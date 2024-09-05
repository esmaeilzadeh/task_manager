import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import Redis from 'ioredis';
import { RedisConfigInterface } from '../shared/interface/redis-config.interface';

dotenv.config();

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis(
      configService.get<RedisConfigInterface>('redis') || {},
    );
  }

  getClient(): Redis {
    return this.client;
  }

  async setWithExpiration(
    key: string,
    value: any,
    expiresIn = 3600,
  ): Promise<string> {
    return this.client.set(key, JSON.stringify(value), 'EX', expiresIn);
  }

  async get(key: string): Promise<any> {
    console.log(
      'redis config: ',
      this.configService.get<RedisConfigInterface>('redis'),
    );
    const result = await this.client.get(key);
    return result ? JSON.parse(result) : null;
  }
  async del(key: string): Promise<boolean> {
    try {
      await this.client.del(key);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
