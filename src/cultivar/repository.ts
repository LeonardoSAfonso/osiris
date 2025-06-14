import { Injectable } from '@nestjs/common';
import { Cultivar } from 'prisma/client';
import { PrismaService } from 'src/orm/prisma.service';
import { CustomQuery } from 'src/shared/types/customQuery.type';
import { PaginationParams } from 'src/shared/types/pagination.type';
import { CreateCultivarDTO } from './domain/create.dto';
import { UpdateCultivarDTO } from 'src/cultivar/domain/update.dto';

@Injectable()
export default class CultivarRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateCultivarDTO) {
    const cultivar = await this.prismaService.cultivar.create({ data });

    return cultivar;
  }

  async find(params: PaginationParams<Cultivar>) {
    const query = CustomQuery.fromPagination(params);

    const elements = await this.prismaService.cultivar.count({
      ...query,
    });

    const cultivares = await this.prismaService.cultivar.findMany({
      ...query,
    });

    return { cultivares, elements };
  }

  async findById(id: string) {
    const cultivar = await this.prismaService.cultivar.findFirst({
      where: { id },
    });

    return cultivar;
  }

  async update(data: UpdateCultivarDTO) {
    const updatedCultivar = await this.prismaService.cultivar.update({
      where: { id: data.id },
      data,
    });

    return updatedCultivar;
  }

  async delete(id: string) {
    return this.prismaService.cultivar.delete({ where: { id } });
  }
}
