import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateFarmerDTO } from './create.dto';

export class UpdateFarmerDTO extends PartialType(CreateFarmerDTO) {
  @IsUUID()
  id: string;
}
