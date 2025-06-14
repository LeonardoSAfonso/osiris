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
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    const updatedCultivar = await this.repository.update(cultivarData);

    return updatedCultivar;
  }
}
