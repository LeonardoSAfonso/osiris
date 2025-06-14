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
import CreateFarmService from './services/create';
import { Farm } from 'prisma/client';
import { PaginationParams } from 'src/shared/types/pagination.type';
import FindFarmsService from './services/find';
import FindOneFarmService from './services/findOne';
import UpdateFarmService from './services/update';
import DeleteFarmService from './services/delete';
import { CreateFarmDTO } from './domain/create.dto';
import { UpdateFarmDTO } from './domain/update.dto';
import { Roles } from 'nest-keycloak-connect';

@Roles({ roles: ['admin', 'panel'] })
@Controller('farm')
export default class StoreController {
  constructor(
    private readonly createService: CreateFarmService,
    private readonly findService: FindFarmsService,
    private readonly findOneService: FindOneFarmService,
    private readonly updateService: UpdateFarmService,
    private readonly deleteService: DeleteFarmService,
  ) {}

  @Post()
  async create(@Body() farm: CreateFarmDTO) {
    return this.createService.execute(farm);
  }

  @Get()
  async find(@Query() query: PaginationParams<Farm>) {
    return this.findService.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneService.execute(id);
  }

  @Put()
  async update(@Body() farm: UpdateFarmDTO) {
    return this.updateService.execute(farm);
  }

  @Delete()
  async delete(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}
