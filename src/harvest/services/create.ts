import { Harvest } from 'prisma/client';
import HarvestRepository from '../repository';
import { Injectable } from '@nestjs/common';
import { CreateHarvestDTO } from '../domain/create.dto';

@Injectable()
export default class CreateHarvestService {
  constructor(private repository: HarvestRepository) {}

  public async execute(harvestData: CreateHarvestDTO): Promise<Harvest> {
    return this.repository.create(harvestData);
  }
}
