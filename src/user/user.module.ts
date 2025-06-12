import { Module } from '@nestjs/common';
import UserController from './user.controller';
import CreateUserService from './services/create';
import FindUsersService from './services/find';
import FindOneUserService from './services/findOne';
import UpdateUserService from './services/update';
import DeleteUserService from './services/delete';
import UserRepository from './repository';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserService,
    FindUsersService,
    FindOneUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
