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
import CreateCultivarService from './services/create';
import { Cultivar } from 'prisma/client';
import { PaginationParams } from 'src/shared/types/pagination.type';
import FindCultivarsService from './services/find';
import FindOneCultivarService from './services/findOne';
import UpdateCultivarService from './services/update';
import DeleteCultivarService from './services/delete';
import { CreateCultivarDTO } from './domain/create.dto';
import { UpdateCultivarDTO } from './domain/update.dto';
import { Roles } from 'nest-keycloak-connect';

@Roles({ roles: ['admin', 'panel'] })
@Controller('cultivar')
export default class CultivarController {
  constructor(
    private readonly createService: CreateCultivarService,
    private readonly findService: FindCultivarsService,
    private readonly findOneService: FindOneCultivarService,
    private readonly updateService: UpdateCultivarService,
    private readonly deleteService: DeleteCultivarService,
  ) {}

  @Post()
  async create(@Body() cultivar: CreateCultivarDTO) {
    return this.createService.execute(cultivar);
  }

  @Get()
  async find(@Query() query: PaginationParams<Cultivar>) {
    return this.findService.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.findOneService.execute(id);
  }

  @Put()
  async update(@Body() cultivar: UpdateCultivarDTO) {
    return this.updateService.execute(cultivar);
  }

  @Delete()
  async delete(@Param('id') id: string) {
    return this.deleteService.execute(id);
  }
}
