import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuditlogService {
    constructor(private readonly prisma: PrismaService) { }

    async GetAlllog(admin) {
        try {

            if (admin.role === "admin") {
                const log = await this.prisma.auditLog.findMany()


                return log
            }

            return null

        } catch (error) {
            throw new Error("Error On Server in Log")
        }
    }

    // {
    //     userId: user.id,
    //     action: 'update_permissions',
    //     resource: 'user',
    //     resourceId: user.id,
    //     details: JSON.stringify({ newPermissions: permissions }),
    // }

    async AddLog(data: { userId: string, action: string, resource: string, resourceId: string, details: string }) {
        try {
            const log = await this.prisma.auditLog.create({
                data: {
                    userId: +data.userId,
                    action: data.action,
                    resource: data.resource,
                    resourceId: +data.userId,
                    details: data.details
                }
            })
        } catch (error) {
            throw new Error("Error On Server in Log")
        }
    }
}
