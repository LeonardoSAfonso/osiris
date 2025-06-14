import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateFarmDTO } from './create.dto';

export class UpdateFarmDTO extends PartialType(CreateFarmDTO) {
  @IsUUID()
  id: string;
}
