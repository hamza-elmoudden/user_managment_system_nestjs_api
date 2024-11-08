import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditlogModule } from 'src/auditlog/auditlog.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[PrismaModule,AuditlogModule],
  exports:[UserService]
})
export class UserModule {}
