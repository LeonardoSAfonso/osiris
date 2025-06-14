import { Cultivar } from 'prisma/client';
import CultivarRepository from '../repository';
import { PaginationParams } from 'src/shared/types/pagination.type';
import getTotalPage from 'src/shared/utils/totalPage';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindCultivaresService {
  constructor(private repository: CultivarRepository) {}

  public async execute(
    params: PaginationParams<Cultivar>,
  ): Promise<[Cultivar[], number]> {
    const { cultivares, elements } = await this.repository.find(params);

    if (!cultivares?.length) {
      return [[], 0];
    }

    return [cultivares, getTotalPage(elements, params.limit)];
  }
}
