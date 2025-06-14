import { Module } from '@nestjs/common';
import HarvestController from './harvest.controller';
import CreateHarvestService from './services/create';
import FindHarvestsService from './services/find';
import FindOneHarvestService from './services/findOne';
import UpdateHarvestService from './services/update';
import DeleteHarvestService from './services/delete';
import HarvestRepository from './repository';
import { PrismaService } from 'src/orm/prisma.service';

@Module({
  controllers: [HarvestController],
  providers: [
    PrismaService,
    HarvestRepository,
    CreateHarvestService,
    FindHarvestsService,
    FindOneHarvestService,
    UpdateHarvestService,
    DeleteHarvestService,
  ],
})
export class HarvestModule {}
