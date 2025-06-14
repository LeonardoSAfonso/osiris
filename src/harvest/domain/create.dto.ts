import { IsString, IsUUID } from 'class-validator';

export class CreateHarvestDTO {
  @IsString()
  year: string;

  @IsString()
  note: string;

  @IsUUID()
  farmId: string;
}
