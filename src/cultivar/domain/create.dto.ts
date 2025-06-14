import { IsString, IsUUID } from 'class-validator';

export class CreateCultivarDTO {
  @IsString()
  name: string;

  @IsString()
  cultivatedArea: string;

  @IsUUID()
  harvestId: string;
}
