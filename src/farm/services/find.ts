import { Farm } from 'prisma/client';
import { PaginationParams } from 'src/shared/types/pagination.type';
import getTotalPage from 'src/shared/utils/totalPage';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindFarmsService {
  constructor(private repository: FarmRepository) {}

  public async execute(
    params: PaginationParams<Farm>,
  ): Promise<[Farm[], number]> {
    const stores = await this.repository.find(params);

    if (!stores[0]?.length) {
      return [[], 0];
    }

    return [stores[0], getTotalPage(stores[1], params.limit)];
  }
}
