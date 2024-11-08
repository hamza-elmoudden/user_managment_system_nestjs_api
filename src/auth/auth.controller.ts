import { Controller, Post, Request ,Res,HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './Dto/loginuserBody';
import { AuthResponseDto } from './Dto/response.token';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @ApiResponse({
        status: 200,
        description: 'Data Post successfully.',
        type:AuthResponseDto
      })
    @ApiBody({
        description:"Body Post",
        type:UserResponseDto
    })
    async login(@Request() req,@Res() reply:FastifyReply) {
        

        const user = await this.authService.validateUser(req.body.email, req.body.password);

        if (!user) {
            reply.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid credentials' });
        }
        
        const token = await this.authService.login(user);

        return reply.status(HttpStatus.OK).send({"token": token}) 
    }
}
