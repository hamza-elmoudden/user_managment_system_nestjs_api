import { ApiProperty } from "@nestjs/swagger";


export class RoleResponseDto {

    @ApiProperty({ description: 'The Id Of Role' })
    id: number;

    @ApiProperty({ description: 'The Role Name' })
    roleName: string;

    @ApiProperty({ description: 'The Description ' })
    description: string | null;

    @ApiProperty({ description: 'The createdAt' })
    createdAt: Date;

    @ApiProperty({ description: 'The updatedAt' })
    updatedAt: Date;
}