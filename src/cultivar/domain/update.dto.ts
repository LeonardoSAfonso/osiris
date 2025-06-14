import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateCultivarDTO } from './create.dto';

export class UpdateCultivarDTO extends PartialType(CreateCultivarDTO) {
  @IsUUID()
  id: string;
}
