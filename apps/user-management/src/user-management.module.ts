import { CustomLoggerModule } from '@app/custom-logger';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbConnectorModule } from '@app/db-connector';
import { ConfigModule } from '@nestjs/config';
import webserverConfig from './config/webserver.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env.dev.local', 'env.dev'],
            ignoreEnvFile: false,
            load: [webserverConfig]
        }),
        DbConnectorModule,
        CustomLoggerModule,
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class UserManagementModule { }
