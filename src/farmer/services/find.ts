import { Farmer } from 'prisma/client';
import FarmerRepository from '../repository';
import { PaginationParams } from 'src/shared/types/pagination.type';
import getTotalPage from 'src/shared/utils/totalPage';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindFarmersService {
  constructor(private repository: FarmerRepository) {}

  public async execute(
    params: PaginationParams<Farmer>,
  ): Promise<[Farmer[], number]> {
    const { farmers, elements } = await this.repository.find(params);

    if (!farmers?.length) {
      return [[], 0];
    }

    return [farmers, getTotalPage(elements, params.limit)];
  }
}
