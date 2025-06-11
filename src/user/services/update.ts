import { User } from 'prisma/client';
import UserRepository from '../repository';
import AppError from 'src/shared/AppError';
import { UpdateDTO } from 'src/shared/types/model.type';

export default class UpdateUserService {
  constructor(private repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(userData: UpdateDTO<User>): Promise<User> {
    const user = await this.repository.findById(userData.id);

    if (!user) {
      throw new AppError('ERRO: Nenhum usuário foi encontrado.', 404);
    }

    if (userData.email) {
      const checkUserEmailExist = await this.repository.findByEmail(
        userData.email,
        '',
      );

      if (checkUserEmailExist && userData.email !== user.email) {
        throw new AppError(
          'ERRO: O endereço de e-mail já está sendo utilizado',
          409,
        );
      }
    }

    const updatedUser = await this.repository.update(user.id, userData);

    return updatedUser;
  }
}
