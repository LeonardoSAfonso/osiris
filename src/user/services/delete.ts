import { User } from 'prisma/client';

import UserRepository from '../repository';
import AppError from 'src/shared/AppError';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DeleteUserService {
  constructor(private repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<User> {
    const checkUserExist = await this.repository.findById(id);

    if (!checkUserExist) {
      throw new AppError('ERRO: Nenhum usuário foi encontrada.', 404);
    }

    return this.repository.delete(id);
  }
}
