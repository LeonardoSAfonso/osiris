import { User } from 'prisma/client';
import CreateUserService from './services/create';
import DeleteUserService from './services/delete';
import FindUsersService from './services/find';
import FindOneUserService from './services/findOne';
import UpdateUserService from './services/update';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDTO, UpdateDTO } from 'src/shared/types/model.type';
import { PaginationParams } from 'src/shared/types/pagination.type';
import { Public } from 'nest-keycloak-connect';

@Public()
@Controller('user')
export default class UserController {
  constructor(
    private readonly createService: CreateUserService,
    private readonly findService: FindUsersService,
    private readonly findOneService: FindOneUserService,
    private readonly updateService: UpdateUserService,
    private readonly deleteService: DeleteUserService,
  ) {}

  @Post()
  async create(@Body() user: CreateDTO<User>) {
    return this.createService.execute(user);
  }

  @Get()
  async find(@Query() query: PaginationParams<User>) {
    return this.findService.execute(new PaginationParams<User>(query));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneService.execute(id);
  }

  @Put()
  async update(@Body() user: UpdateDTO<User>) {
    return this.updateService.execute(user);
  }

  @Delete()
  async delete(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}
