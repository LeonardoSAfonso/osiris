import { Cultivar } from 'prisma/client';
import CultivarRepository from '../repository';
import { Injectable } from '@nestjs/common';
import { CreateCultivarDTO } from '../domain/create.dto';

@Injectable()
export default class CreateCultivarService {
  constructor(private repository: CultivarRepository) {}

  public async execute(cultivarData: CreateCultivarDTO): Promise<Cultivar> {
    return this.repository.create(cultivarData);
  }
}
