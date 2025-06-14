import { Harvest } from 'prisma/client';
import AppError from 'src/shared/AppError';
import HarvestRepository from '../repository';
import { Injectable } from '@nestjs/common';
import { UpdateHarvestDTO } from 'src/harvest/domain/update.dto';

@Injectable()
export default class UpdateHarvestService {
  constructor(private repository: HarvestRepository) {}

  public async execute(harvestData: UpdateHarvestDTO): Promise<Harvest> {
    const harvest = await this.repository.findById(harvestData.id);

    if (!harvest) {
      throw new AppError('ERRO: Nenhuma safra foi encontrada.', 404);
    }

    return this.repository.update(harvestData);
  }
}
