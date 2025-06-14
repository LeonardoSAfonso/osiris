// dto/create-farm.dto.ts
import {
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { IsTotalAreaValid } from '../utils/totalArea.validator';

@IsTotalAreaValid()
export class CreateFarmDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  coordenates?: string;

  @IsNumber()
  @IsPositive()
  totalArea: number;

  @IsNumber()
  @IsPositive()
  farmableArea: number;

  @IsNumber()
  @IsPositive()
  greenArea: number;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsUUID()
  farmerId: string;
}
