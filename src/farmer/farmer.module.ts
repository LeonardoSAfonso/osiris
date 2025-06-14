import { Module } from '@nestjs/common';
import FarmerController from './farmer.controller';
import CreateFarmerService from './services/create';
import FindFarmersService from './services/find';
import FindOneFarmerService from './services/findOne';
import UpdateFarmerService from './services/update';
import DeleteFarmerService from './services/delete';
import FarmerRepository from './repository';

@Module({
  controllers: [FarmerController],
  providers: [
    FarmerRepository,
    CreateFarmerService,
    FindFarmersService,
    FindOneFarmerService,
    UpdateFarmerService,
    DeleteFarmerService,
  ],
})
export class FarmerModule {}
