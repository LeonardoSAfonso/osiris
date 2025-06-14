import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateHarvestDTO } from './create.dto';

export class UpdateHarvestDTO extends PartialType(CreateHarvestDTO) {
  @IsUUID()
  id: string;
}
