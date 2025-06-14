import { Harvest } from 'prisma/client';
import HarvestRepository from '../repository';
import { PaginationParams } from 'src/shared/types/pagination.type';
import getTotalPage from 'src/shared/utils/totalPage';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindHarvestsService {
  constructor(private repository: HarvestRepository) {}

  public async execute(
    params: PaginationParams<Harvest>,
  ): Promise<[Harvest[], number]> {
    const { harvests, elements } = await this.repository.find(params);

    if (!harvests?.length) {
      return [[], 0];
    }

    return [harvests, getTotalPage(elements, params.limit)];
  }
}
