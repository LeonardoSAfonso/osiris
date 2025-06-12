import { User } from 'prisma/client';
import UserRepository from '../repository';
import { PaginationParams } from 'src/shared/types/pagination.type';
import getTotalPage from 'src/shared/utils/totalPage';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindUsersService {
  constructor(private repository: UserRepository) {
    this.repository = repository;
  }

  public async execute(
    params: PaginationParams<User>,
  ): Promise<[User[], number]> {
    const users = await this.repository.find(params, '');

    if (!users[0]?.length) {
      return [[], 0];
    }

    return [users[0], getTotalPage(users[1], params.limit)];
  }
}
