import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuditlogService } from 'src/auditlog/auditlog.service';



@Injectable()
export class AuthService {
  constructor(
    private readonly userserviec: UserService, 
    private readonly jwtService: JwtService,
    private readonly audlog:AuditlogService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.userserviec.FindUserByEmail(email)

    if (user && (await this.userserviec.compare(pass, user?.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {

    const role = user?.roles[0].role.roleName

    const payload = { name: user.name, id: user.id,role };

    const Token = this.jwtService.sign(payload)

    this.audlog.AddLog({
      userId: user.id,
      action: `login on user `,
      resource: `${user.name}`,
      resourceId: `${user.id}`,
      details: JSON.stringify({ "message": `user ${user.name} is login in time ${Date.now()}`,"user":`${user.name}` })
    })

    return {
      access_token: Token,

    };
  }
}
