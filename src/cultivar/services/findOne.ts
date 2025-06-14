import { Cultivar } from 'prisma/client';
import AppError from 'src/shared/AppError';
import CultivarRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindOneCultivarService {
  constructor(private repository: CultivarRepository) {}

  public async execute(id: string): Promise<Cultivar> {
    const cultivar = await this.repository.findById(id);

    if (!cultivar) {
      throw new AppError('ERRO: Nenhuma cultira foi encontrada.', 404);
    }

    return cultivar;
  }
}
