import { Cultivar } from 'prisma/client';
import AppError from 'src/shared/AppError';
import CultivarRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DeleteCultivarService {
  constructor(private repository: CultivarRepository) {}

  public async execute(id: string): Promise<Cultivar> {
    const checkCultivarExist = await this.repository.findById(id);

    if (!checkCultivarExist) {
      throw new AppError('ERRO: Nenhuma cultura foi encontrada.', 404);
    }

    return this.repository.delete(id);
  }
}
