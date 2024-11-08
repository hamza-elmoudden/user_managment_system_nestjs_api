import { Module } from '@nestjs/common';
import { AuditlogService } from './auditlog.service';
import { AuditlogController } from './auditlog.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AuditlogService],
  controllers: [AuditlogController],
  imports:[PrismaModule],
  exports:[AuditlogService]
})
export class AuditlogModule {}
