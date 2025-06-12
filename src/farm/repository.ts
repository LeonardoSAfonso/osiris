import { Injectable } from '@nestjs/common';
import { Farm } from 'prisma/client';
import { PrismaService } from 'src/orm/prisma.service';
import { CustomQuery } from 'src/shared/types/customQuery.type';
import { CreateDTO, UpdateDTO } from 'src/shared/types/model.type';
import { PaginationParams } from 'src/shared/types/pagination.type';

@Injectable()
export default class FarmRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateDTO<Farm>): Promise<Farm> {
    const farm = await this.prismaService.farm.create({ data });

    return farm;
  }

  async find(params: PaginationParams<Farm>): Promise<[Farm[], number]> {
    const query = CustomQuery.fromPagination(params);

    const elements = await this.prismaService.farm.count({
      ...query,
    });

    const farms = await this.prismaService.farm.findMany({
      ...query,
    });

    return [farms, elements];
  }

  async findById(id: string): Promise<Farm | null> {
    const farm = await this.prismaService.farm.findFirst({
      where: { id },
    });

    return farm;
  }

  async findByEmail(email: string): Promise<Farm | null> {
    const farm = await this.prismaService.farm.findUnique({
      where: { email },
    });

    return farm;
  }

  async findByIdentification(identification: string): Promise<Farm | null> {
    const farm = await this.prismaService.farm.findUnique({
      where: { identification },
    });

    return farm;
  }

  async update(id: string, data: UpdateDTO<Farm>): Promise<Farm> {
    const updatedFarm = await this.prismaService.farm.update({
      where: { id },
      data,
    });

    return updatedFarm;
  }

  async delete(id: string): Promise<Farm> {
    return this.prismaService.farm.delete({ where: { id } });
  }
}
