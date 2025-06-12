import { PrismaService } from 'src/orm/prisma.service';
import { User } from 'prisma/client';
import { CreateDTO, UpdateDTO } from 'src/shared/types/model.type';
import { PaginationParams } from 'src/shared/types/pagination.type';
import { CustomQuery } from 'src/shared/types/customQuery.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateDTO<User>): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  public async find(
    params: PaginationParams<User>,
    farmId: string,
  ): Promise<[User[], number]> {
    const query = CustomQuery.fromPagination(params).withCondition({ farmId });

    const elements = await this.prismaService.user.count({
      ...query,
    });

    const users = await this.prismaService.user.findMany({
      ...query,
    });

    return [users, elements];
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    return user;
  }

  public async findByEmail(
    email: string,
    farmId: string,
  ): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email, farmId },
    });

    return user;
  }

  public async update(id: string, data: UpdateDTO<User>): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
