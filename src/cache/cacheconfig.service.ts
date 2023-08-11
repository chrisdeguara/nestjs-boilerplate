import { Injectable } from '@nestjs/common';
import { CacheOptionsFactory, CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      isGlobal: true,
      ttl: this.configService.get('CACHE_TTL'),
      url: this.configService.get('REDIS_CACHE_URL'),
    };
  }
}
