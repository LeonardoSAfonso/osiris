import { Cultivar } from 'prisma/client';
import AppError from 'src/shared/AppError';
import CultivarRepository from '../repository';
import { Injectable } from '@nestjs/common';
import { UpdateCultivarDTO } from 'src/cultivar/domain/update.dto';

@Injectable()
export default class UpdateCultivarService {
  constructor(private repository: CultivarRepository) {}

  public async execute(cultivarData: UpdateCultivarDTO): Promise<Cultivar> {
    const cultivar = await this.repository.findById(cultivarData.id);

    if (!cultivar) {
      throw new AppError('ERRO: Nenhuma cultura foi encontrada.', 404);
    }

    return this.repository.update(cultivarData);
  }
}
