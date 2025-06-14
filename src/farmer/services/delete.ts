import { Farmer } from 'prisma/client';

import FarmerRepository from '../repository';
import AppError from 'src/shared/AppError';
import { Injectable } from '@nestjs/common';
import { KeycloakUserService } from 'src/keycloak/keycloak-user.service';

@Injectable()
export default class DeleteFarmerService {
  constructor(
    private repository: FarmerRepository,
    private keycloakUserService: KeycloakUserService,
  ) {}

  public async execute(id: string): Promise<Farmer> {
    const checkFarmerExist = await this.repository.findById(id);

    if (!checkFarmerExist) {
      throw new AppError('ERRO: Nenhum usuário foi encontrada.', 404);
    }

    await this.keycloakUserService.remove(checkFarmerExist.keycloakId);

    return this.repository.delete(id);
  }
}
