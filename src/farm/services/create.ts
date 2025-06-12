import { Farm } from 'prisma/client';
import AppError from 'src/shared/AppError';
import { CreateDTO } from 'src/shared/types/model.type';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CreateFarmService {
  constructor(private repository: FarmRepository) {}

  public async execute(farmData: CreateDTO<Farm>): Promise<Farm> {
    const checkFarmEmailExist = await this.repository.findByEmail(
      farmData.email,
    );

    if (checkFarmEmailExist) {
      throw new AppError(
        'ERRO: O endereço de e-mail já está sendo utilizado',
        409,
      );
    }

    const checkFarmIdentificationExist =
      await this.repository.findByIdentification(farmData.email);

    if (checkFarmIdentificationExist) {
      throw new AppError('ERRO: O CPF/CNPJ já está sendo utilizado', 409);
    }

    return this.repository.create(farmData);
  }
}
