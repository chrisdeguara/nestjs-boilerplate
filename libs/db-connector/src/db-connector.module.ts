import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomLoggerModule } from '@app/custom-logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.dev.local', 'env.dev'],
          ignoreEnvFile: false,
          load: [dbConfig]
      }),
      CustomLoggerModule,
      TypeOrmModule.forRootAsync({
          imports: [],
          useFactory: (configService: ConfigService) => ({
              type: 'mysql',
              host: configService.get('db.host'),
              port: parseInt(configService.get('db.port')),
              username: configService.get('db.username'),
              password: configService.get('db.password'),
              database: configService.get('db.database'),
              entities: [],
              synchronize: false,
              autoLoadEntities: true
          }),
          inject: [ConfigService]
      }),
  ],
  controllers: [],
  providers: [],
})
export class DbConnectorModule {}
