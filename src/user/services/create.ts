import AppError from 'src/shared/AppError';
import { CreateDTO } from 'src/shared/types/model.type';
import UserRepository from '../repository';
import { User } from 'prisma/client';

export default class CreateUserService {
  constructor(private repository: UserRepository) {}

  public async execute(userData: CreateDTO<User>): Promise<User> {
    const checkUserEmailExist = await this.repository.findByEmail(
      userData.email,
      '',
    );

    if (checkUserEmailExist) {
      throw new AppError(
        'ERRO: O endereço de e-mail já está sendo utilizado',
        409,
      );
    }

    let user: User;

    return user;
  }
}
