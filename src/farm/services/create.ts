import { Farm } from 'prisma/client';
import FarmRepository from '../repository';
import { Injectable } from '@nestjs/common';
import { CreateFarmDTO } from '../domain/create.dto';

@Injectable()
export default class CreateFarmService {
  constructor(private repository: FarmRepository) {}

  public async execute(farmData: CreateFarmDTO): Promise<Farm> {
    return this.repository.create(farmData);
  }
}
