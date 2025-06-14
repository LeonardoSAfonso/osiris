import { Harvest } from 'prisma/client';
import AppError from 'src/shared/AppError';
import HarvestRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindOneHarvestService {
  constructor(private repository: HarvestRepository) {}

  public async execute(id: string): Promise<Harvest> {
    const harvest = await this.repository.findById(id);

    if (!harvest) {
      throw new AppError('ERRO: Nenhuma safra foi encontrada.', 404);
    }

    return harvest;
  }
}
