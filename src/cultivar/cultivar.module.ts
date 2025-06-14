import { Module } from '@nestjs/common';
import CultivarController from './cultivar.controller';
import CreateCultivarService from './services/create';
import FindCultivarsService from './services/find';
import FindOneCultivarService from './services/findOne';
import UpdateCultivarService from './services/update';
import DeleteCultivarService from './services/delete';
import CultivarRepository from './repository';
import { PrismaService } from 'src/orm/prisma.service';

@Module({
  controllers: [CultivarController],
  providers: [
    PrismaService,
    CultivarRepository,
    CreateCultivarService,
    FindCultivarsService,
    FindOneCultivarService,
    UpdateCultivarService,
    DeleteCultivarService,
  ],
})
export class CultivarModule {}
