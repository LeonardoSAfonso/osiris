import { Injectable } from '@nestjs/common';
import { Harvest } from 'prisma/client';
import { PrismaService } from 'src/orm/prisma.service';
import { CustomQuery } from 'src/shared/types/customQuery.type';
import { PaginationParams } from 'src/shared/types/pagination.type';
import { CreateHarvestDTO } from './domain/create.dto';
import { UpdateHarvestDTO } from 'src/harvest/domain/update.dto';

@Injectable()
export default class HarvestRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateHarvestDTO) {
    const harvest = await this.prismaService.harvest.create({ data });

    return harvest;
  }

  async find(params: PaginationParams<Harvest>) {
    const query = CustomQuery.fromPagination(params);

    const elements = await this.prismaService.harvest.count({
      ...query,
    });

    const harvests = await this.prismaService.harvest.findMany({
      ...query,
    });

    return { harvests, elements };
  }

  async findById(id: string) {
    const harvest = await this.prismaService.harvest.findFirst({
      where: { id },
    });

    return harvest;
  }

  async update(data: UpdateHarvestDTO) {
    const updatedHarvest = await this.prismaService.harvest.update({
      where: { id: data.id },
      data,
    });

    return updatedHarvest;
  }

  async delete(id: string) {
    return this.prismaService.harvest.delete({ where: { id } });
  }
}
