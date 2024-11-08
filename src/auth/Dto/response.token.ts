import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'The Token on login  of the User' })
  token: string;
  
}
