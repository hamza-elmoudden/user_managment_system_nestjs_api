import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'The email identifier of the User' })
  email: string;
  
  @ApiProperty({ description: 'The password identifier of the User' })
  password :string
  
}
