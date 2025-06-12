import { Farm } from 'prisma/client';
import AppError from 'src/shared/AppError';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindOneFarmService {
  constructor(private storeRepository: FarmRepository) {}

  public async execute(id: string): Promise<Farm> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    return store;
  }
}
