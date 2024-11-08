import { ApiProperty } from "@nestjs/swagger";

export class UsergResponseDto{

    @ApiProperty({ description: 'The name Of user' })
    name: string; 

    @ApiProperty({ description: 'The id Of user' })
    id: number; 

    @ApiProperty({ description: 'The email Of user' })
    email: string; 

    @ApiProperty({ description: 'The password Of user' })
    password: string
}