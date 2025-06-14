import { Farm } from 'prisma/client';
import AppError from 'src/shared/AppError';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class FindOneFarmService {
  constructor(private repository: FarmRepository) {}

  public async execute(id: string): Promise<Farm> {
    const farm = await this.repository.findById(id);

    if (!farm) {
      throw new AppError('ERRO: Nenhuma fazenda foi encontrada.', 404);
    }

    return farm;
  }
}
