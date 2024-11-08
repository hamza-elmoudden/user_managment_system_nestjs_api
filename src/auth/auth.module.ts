import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { AuditlogModule } from 'src/auditlog/auditlog.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService,JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '48h' },
    }),
    PrismaModule,
    AuditlogModule,
  ],
  exports: [AuthService]
})
export class AuthModule {}
