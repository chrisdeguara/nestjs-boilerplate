import { Injectable } from '@nestjs/common';
import { CacheOptionsFactory, CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class RedisCacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      isGlobal: true,
      ttl: this.configService.get('cache.ttl'),
      host: this.configService.get('cache.redis.host'),
      port: this.configService.get('cache.redis.port'),
      db: this.configService.get('cache.redis.db')
    };
  }
}
