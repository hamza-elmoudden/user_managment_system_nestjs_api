import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditlogModule } from 'src/auditlog/auditlog.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports:[UserModule,PrismaModule,AuditlogModule]
})
export class RoleModule {}
