import { PrismaService } from 'src/orm/prisma.service';
import { Farmer } from 'prisma/client';
import { PaginationParams } from 'src/shared/types/pagination.type';
import { CustomQuery } from 'src/shared/types/customQuery.type';
import { Injectable } from '@nestjs/common';
import { CreateFarmerDTO } from './domain/create.dto';
import { UpdateFarmerDTO } from './domain/update.dto';

@Injectable()
export default class FarmerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateFarmerDTO) {
    return this.prismaService.farmer.create({ data });
  }

  public async find(params: PaginationParams<Farmer>) {
    const query = CustomQuery.fromPagination(params);

    const elements = await this.prismaService.farmer.count({
      ...query,
    });

    const farmers = await this.prismaService.farmer.findMany({
      ...query,
    });

    return { elements, farmers };
  }

  public async findById(id: string) {
    const Farmer = await this.prismaService.farmer.findFirst({
      where: { id },
      include: { Farms: true },
    });

    return Farmer;
  }

  public async findForBI(id: string) {
    const Farmer = await this.prismaService.farmer.findFirst({
      where: { id },
      include: {
        Farms: { include: { Harvests: { include: { Cultivares: true } } } },
      },
    });

    return Farmer;
  }

  async findByEmail(email: string) {
    return this.prismaService.farmer.findUnique({
      where: { email },
    });
  }

  async findByIdentification(identification: string) {
    return this.prismaService.farmer.findUnique({
      where: { identification },
    });
  }

  public async update(data: UpdateFarmerDTO) {
    const updatedFarmer = await this.prismaService.farmer.update({
      where: { id: data.id },
      data,
    });

    return updatedFarmer;
  }

  async delete(id: string) {
    return this.prismaService.farmer.delete({ where: { id } });
  }
}
