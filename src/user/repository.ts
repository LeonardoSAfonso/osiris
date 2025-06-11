import { PrismaService } from 'src/orm/prisma.provider';
import { User } from 'prisma/client';
import { CreateDTO, UpdateDTO } from 'src/shared/types/model.type';
import { PaginationParams } from 'src/shared/types/pagination.type';

export default class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateDTO<User>): Promise<User> {
    await this.createAdmin();
    const user = await this.prismaService.user.create({ data });

    await this.prismaService.$disconnect();
    return user;
  }

  public async find(
    params: PaginationParams<User>,
    farmId: string,
  ): Promise<[User[], number]> {
    const elements = await this.prismaService.user.count({
      ...params.getCount().withCondition({ farmId }),
    });

    const users = await this.prismaService.user.findMany({
      ...params.getQuery().withCondition({ farmId }),
    });

    await this.prismaService.$disconnect();
    return [users, elements];
  }

  public async createAdmin(): Promise<void> {
    await this.prismaService.user.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      create: {
        email: process.env.ADMIN_EMAIL || 'admin',
        name: 'admin',
        password: process.env.ADMIN_PASSWORD,
      },
      update: {},
    });

    await this.prismaService.$disconnect();
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    await this.prismaService.$disconnect();
    return user;
  }

  public async findByEmail(
    email: string,
    farmId: string,
  ): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: { email, farmId },
    });

    await this.prismaService.$disconnect();
    return user;
  }

  public async update(id: string, data: UpdateDTO<User>): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data,
    });

    await this.prismaService.$disconnect();
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
