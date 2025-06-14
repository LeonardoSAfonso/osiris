import { Farm } from 'prisma/client';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';
import { UpdateFarmDTO } from '../domain/update.dto';
import AppError from 'src/shared/AppError';

@Injectable()
export default class UpdateFarmService {
  constructor(private repository: FarmRepository) {}

  public async execute(farmData: UpdateFarmDTO): Promise<Farm> {
    const farm = await this.repository.findById(farmData.id);

    if (!farm) {
      throw new AppError('ERRO: Nenhuma fazenda foi encontrada.', 404);
    }

    return this.repository.update(farmData);
  }
}
