import { Harvest } from 'prisma/client';
import AppError from 'src/shared/AppError';
import HarvestRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DeleteHarvestService {
  constructor(private repository: HarvestRepository) {}

  public async execute(id: string): Promise<Harvest> {
    const checkHarvestExist = await this.repository.findById(id);

    if (!checkHarvestExist) {
      throw new AppError('ERRO: Nenhuma safra foi encontrada.', 404);
    }

    return this.repository.delete(id);
  }
}
