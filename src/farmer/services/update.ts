import { Farmer } from 'prisma/client';
import FarmerRepository from '../repository';
import AppError from 'src/shared/AppError';
import { Injectable } from '@nestjs/common';
import { UpdateFarmerDTO } from '../domain/update.dto';

@Injectable()
export default class UpdateFarmerService {
  constructor(private repository: FarmerRepository) {
    this.repository = repository;
  }

  public async execute(farmerData: UpdateFarmerDTO): Promise<Farmer> {
    const farmer = await this.repository.findById(farmerData.id);

    if (!farmer) {
      throw new AppError('ERRO: Nenhum usuário foi encontrado.', 404);
    }

    if (farmerData.email) {
      const checkFarmEmailExist = await this.repository.findByEmail(
        farmerData.email,
      );

      if (checkFarmEmailExist && farmerData.email !== farmer.email) {
        throw new AppError(
          'ERRO: O endereço de e-mail já está sendo utilizado',
          409,
        );
      }
    }

    if (farmerData.identification) {
      const checkFarmEmailExist = await this.repository.findByEmail(
        farmerData.identification,
      );

      if (
        checkFarmEmailExist &&
        farmerData.identification !== farmer.identification
      ) {
        throw new AppError('ERRO: O CPF/CNPJ já está sendo utilizado', 409);
      }
    }

    const updatedFarmer = await this.repository.update(farmerData);

    return updatedFarmer;
  }
}
