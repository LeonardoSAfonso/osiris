import AppError from 'src/shared/AppError';
import FarmerRepository from '../repository';
import { Farmer } from 'prisma/client';
import { Injectable } from '@nestjs/common';
import { KeycloakUserService } from 'src/keycloak/keycloak-user.service';
import { CreateFarmerDTO } from '../domain/create.dto';

@Injectable()
export default class CreateFarmerService {
  constructor(
    private repository: FarmerRepository,
    private keycloakUserService: KeycloakUserService,
  ) {}

  public async execute(farmerData: CreateFarmerDTO): Promise<Farmer> {
    const checkFarmEmailExist = await this.repository.findByEmail(
      farmerData.email,
    );

    if (checkFarmEmailExist) {
      throw new AppError(
        'ERRO: O endereço de e-mail já está sendo utilizado',
        409,
      );
    }

    const checkFarmIdentificationExist =
      await this.repository.findByIdentification(farmerData.email);

    if (checkFarmIdentificationExist) {
      throw new AppError('ERRO: O CPF/CNPJ já está sendo utilizado', 409);
    }

    const kcUser = await this.keycloakUserService.create({
      email: farmerData.email,
      name: farmerData.name,
      password: farmerData.email,
    });

    delete farmerData.password;

    return this.repository.create({
      keycloakId: kcUser.id,
      ...farmerData,
    });
  }
}
