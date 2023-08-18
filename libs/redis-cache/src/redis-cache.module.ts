import { Module } from '@nestjs/common';
import { RedisCacheConfigService } from './redis-cache-config.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import cacheConfig from './config/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', 'env.dev'],
      ignoreEnvFile: false,
      load: [ cacheConfig]
    }),
    CacheModule.registerAsync({
      useClass: RedisCacheConfigService
    }),
  ],
  providers: [RedisCacheConfigService],
  exports: [
    CacheModule,
    RedisCacheConfigService],
})
export class RedisCacheModule {}
