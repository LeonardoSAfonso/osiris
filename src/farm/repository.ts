import { Injectable } from '@nestjs/common';
import { Farm } from 'prisma/client';
import { PrismaService } from 'src/orm/prisma.service';
import { CustomQuery } from 'src/shared/types/customQuery.type';
import { PaginationParams } from 'src/shared/types/pagination.type';
import { CreateFarmDTO } from './domain/create.dto';
import { UpdateFarmDTO } from './domain/update.dto';

@Injectable()
export default class FarmRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateFarmDTO) {
    const farm = await this.prismaService.farm.create({ data });

    return farm;
  }

  async find(params: PaginationParams<Farm>) {
    const query = CustomQuery.fromPagination(params);

    const elements = await this.prismaService.farm.count({
      ...query,
    });

    const farms = await this.prismaService.farm.findMany({
      ...query,
    });

    return { farms, elements };
  }

  async findById(id: string) {
    const farm = await this.prismaService.farm.findFirst({
      where: { id },
    });

    return farm;
  }

  async update(data: UpdateFarmDTO) {
    const updatedFarm = await this.prismaService.farm.update({
      where: { id: data.id },
      data,
    });

    return updatedFarm;
  }

  async delete(id: string) {
    return this.prismaService.farm.delete({ where: { id } });
  }
}
