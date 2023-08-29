import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './subscribers/user.subscriber';
import { CustomLoggerModule } from '@app/custom-logger';
import { USER_SERVICE } from './constants/constants';

const userService = {
    provide: USER_SERVICE,
    useClass: UserService
  }

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CustomLoggerModule
    ],
    controllers: [
        UsersController
    ],
    providers: [
        userService,
        UserSubscriber
    ],
})
export class UsersModule { }
