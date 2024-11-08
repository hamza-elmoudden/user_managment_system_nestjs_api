import { IsString, IsEmail, IsIn, IsInt } from 'class-validator';

export class ChangeRoleUserDto {
  @IsInt()
  user_id: number;

  @IsInt()
  role_id: number;

}