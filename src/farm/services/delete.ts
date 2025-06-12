import { Farm } from 'prisma/client';
import AppError from 'src/shared/AppError';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DeleteFarmService {
  constructor(private repository: FarmRepository) {}

  public async execute(id: string): Promise<Farm> {
    const checkFarmExist = await this.repository.findById(id);

    if (!checkFarmExist) {
      throw new AppError('ERRO: Nenhuma fazenda foi encontrada.', 404);
    }

    const store = await this.repository.delete(id);

    return store;
  }
}
