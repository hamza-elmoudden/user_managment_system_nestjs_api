import { ApiProperty } from '@nestjs/swagger';

export class LogResponseDto {
    @ApiProperty({ description: 'The Id Of user' })
    userId: number

    @ApiProperty({ description: 'The action the user do' })
    action: string

    @ApiProperty({ description: 'The Resourec of the action' })
    resource: string

    @ApiProperty({ description: 'The ResourecId of the action' })
    resourceId:number

    @ApiProperty({ description: 'Json Detiles' })
    details: JSON
    
  
}
