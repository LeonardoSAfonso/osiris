import { Farm } from 'prisma/client';
import AppError from 'src/shared/AppError';
import { UpdateDTO } from 'src/shared/types/model.type';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UpdateFarmService {
  constructor(private repository: FarmRepository) {}

  public async execute(farmData: UpdateDTO<Farm>): Promise<Farm> {
    const farm = await this.repository.findById(farmData.id);

    if (!farm) {
      throw new AppError('ERRO: Nenhuma loja foi encontrada.', 404);
    }

    if (farmData.email) {
      const checkFarmEmailExist = await this.repository.findByEmail(
        farmData.email,
      );

      if (checkFarmEmailExist && farmData.email !== farm.email) {
        throw new AppError(
          'ERRO: O endereço de e-mail já está sendo utilizado',
          409,
        );
      }
    }

    if (farmData.identification) {
      const checkFarmEmailExist = await this.repository.findByEmail(
        farmData.identification,
      );

      if (
        checkFarmEmailExist &&
        farmData.identification !== farm.identification
      ) {
        throw new AppError('ERRO: O CPF/CNPJ já está sendo utilizado', 409);
      }
    }

    const updatedFarm = await this.repository.update(farm.id, farmData);

    return updatedFarm;
  }
}
