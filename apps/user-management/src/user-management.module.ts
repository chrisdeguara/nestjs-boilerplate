import { CustomLoggerModule } from '@app/custom-logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import webserverConfig from './config/webserver.config';
import dbConfig from './config/db.config';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.dev.local', 'env.dev'],
            ignoreEnvFile: false,
            load: [webserverConfig, dbConfig]
        }),
        CustomLoggerModule,
        TypeOrmModule.forRootAsync({
            imports: [],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('db.host'),
                port: +configService.get('db.port'),
                username: configService.get('db.username'),
                password: configService.get('db.password'),
                database: configService.get('db.database'),
                entities: [],
                synchronize: false,
                autoLoadEntities: true
            }),
            inject: [ConfigService]
        }),
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class UserManagementModule { }
