import { Cultivar } from 'prisma/client';
import AppError from 'src/shared/AppError';
import CultivarRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindOneCultivarService {
  constructor(private storeRepository: CultivarRepository) {}

  public async execute(id: string): Promise<Cultivar> {
    const store = await this.storeRepository.findById(id);

    if (!store) {
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    return store;
  }
}
