import { IsEmail, IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsEmail()
  email: string;

  @IsString()
  newPassword: string;
}
