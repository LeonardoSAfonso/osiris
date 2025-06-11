import { User } from 'prisma/client';
import UserRepository from '../repository';
import AppError from 'src/shared/AppError';

export default class FindOneUserService {
  constructor(private repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('ERRO: Nenhum usuário foi encontrado.', 404);
    }

    return user;
  }
}
