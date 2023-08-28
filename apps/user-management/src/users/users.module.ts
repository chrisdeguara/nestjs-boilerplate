import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { CustomLoggerModule } from '@app/custom-logger';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CustomLoggerModule
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService,
        UserSubscriber
    ],
})
export class UsersModule { }
