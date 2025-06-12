import { Module } from '@nestjs/common';
import FarmController from './farm.controller';
import CreateFarmService from './services/create';
import FindFarmsService from './services/find';
import FindOneFarmService from './services/findOne';
import UpdateFarmService from './services/update';
import DeleteFarmService from './services/delete';
import FarmRepository from './repository';
import { PrismaService } from 'src/orm/prisma.service';

@Module({
  controllers: [FarmController],
  providers: [
    PrismaService,
    FarmRepository,
    CreateFarmService,
    FindFarmsService,
    FindOneFarmService,
    UpdateFarmService,
    DeleteFarmService,
  ],
})
export class FarmModule {}
