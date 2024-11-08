import { Injectable } from '@nestjs/common';
import { IsLowercase } from 'class-validator';
import { AuditlogService } from 'src/auditlog/auditlog.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userserive: UserService,
        private readonly audlog:AuditlogService,
    ) { }


    async GetRole(admin:any) {
        try {


            if ( admin.role === "admin") {
                this.audlog.AddLog({
                    userId: admin.id,
                    action: `login on user `,
                    resource: `${admin.name}`,
                    resourceId: `${admin.id}`,
                    details: JSON.stringify({ "message": `user ${admin.name} Get role in time ${Date.now()}`,"user":`${admin.name}` })
                
                  })
                  
                const role = await this.prisma.role.findMany();
                return role;
            }


            return null


        } catch (error) {
            throw new Error("Error On Server")
        }
    }
}
