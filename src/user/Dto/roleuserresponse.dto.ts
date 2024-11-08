import { ApiProperty } from "@nestjs/swagger";

export class RoleResponseUserDto {

    @ApiProperty({ description: 'The createdAt Of role' })
    createdAt: Date;

    @ApiProperty({ description: 'The updatedAt Of role' })
    updatedAt: Date;

    @ApiProperty({ description: 'The name Of role' })
    name: string;

    @ApiProperty({ description: 'The email Of rolee' })
    email: string;

    @ApiProperty({ description: 'The roles Of role' })
    roles: {
        role: {
            
            roleName: string;
            permissions: {
                permission: {
                    permissionName: string;
                };
            }[];
        };
        roleId: number;
    }[];
}