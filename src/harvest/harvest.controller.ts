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
import CreateHarvestService from './services/create';
import { Harvest } from 'prisma/client';
import { PaginationParams } from 'src/shared/types/pagination.type';
import FindHarvestsService from './services/find';
import FindOneHarvestService from './services/findOne';
import UpdateHarvestService from './services/update';
import DeleteHarvestService from './services/delete';
import { CreateHarvestDTO } from './domain/create.dto';
import { UpdateHarvestDTO } from './domain/update.dto';
import { Roles } from 'nest-keycloak-connect';

@Roles({ roles: ['admin', 'panel'] })
@Controller('harvest')
export default class StoreController {
  constructor(
    private readonly createService: CreateHarvestService,
    private readonly findService: FindHarvestsService,
    private readonly findOneService: FindOneHarvestService,
    private readonly updateService: UpdateHarvestService,
    private readonly deleteService: DeleteHarvestService,
  ) {}

  @Post()
  async create(@Body() harvest: CreateHarvestDTO) {
    return this.createService.execute(harvest);
  }

  @Get()
  async find(@Query() query: PaginationParams<Harvest>) {
    return this.findService.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneService.execute(id);
  }

  @Put()
  async update(@Body() harvest: UpdateHarvestDTO) {
    return this.updateService.execute(harvest);
  }

  @Delete()
  async delete(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}
