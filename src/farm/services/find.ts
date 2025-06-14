import { Farm } from 'prisma/client';
import FarmRepository from '../repository';
import { PaginationParams } from 'src/shared/types/pagination.type';
import getTotalPage from 'src/shared/utils/totalPage';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindFarmsService {
  constructor(private repository: FarmRepository) {}

  public async execute(
    params: PaginationParams<Farm>,
  ): Promise<[Farm[], number]> {
    const { farms, elements } = await this.repository.find(params);

    if (!farms?.length) {
      return [[], 0];
    }

    return [farms, getTotalPage(elements, params.limit)];
  }
}
