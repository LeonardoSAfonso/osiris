import { Farmer } from 'prisma/client';
import CreateFarmerService from './services/create';
import DeleteFarmerService from './services/delete';
import FindFarmersService from './services/find';
import FindOneFarmerService from './services/findOne';
import UpdateFarmerService from './services/update';
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
import { PaginationParams } from 'src/shared/types/pagination.type';
import { Roles } from 'nest-keycloak-connect';
import { CreateFarmerDTO } from './domain/create.dto';
import { UpdateFarmerDTO } from './domain/update.dto';

@Roles({ roles: ['admin'] })
@Controller('farmer')
export default class FarmerController {
  constructor(
    private readonly createService: CreateFarmerService,
    private readonly findService: FindFarmersService,
    private readonly findOneService: FindOneFarmerService,
    private readonly updateService: UpdateFarmerService,
    private readonly deleteService: DeleteFarmerService,
  ) {}

  @Post()
  async create(@Body() farmer: CreateFarmerDTO) {
    return this.createService.execute(farmer);
  }

  @Get()
  async find(@Query() query: PaginationParams<Farmer>) {
    return this.findService.execute(new PaginationParams<Farmer>(query));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneService.execute(id);
  }

  @Put()
  async update(@Body() farmer: UpdateFarmerDTO) {
    return this.updateService.execute(farmer);
  }

  @Delete()
  async delete(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}
