import { Controller, Get ,HttpStatus,Res, UseGuards,Request} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/auth/auth.Guard';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { RoleResponseDto } from './Dto/roleResponse.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleservice:RoleService){}



    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Data Get successfully.',
        type:RoleResponseDto
      })
      @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token to authorize the request',
        required: true,
    })
    async GetRelo(@Res() reply:FastifyReply,@Request() req:any):Promise<Role>{
        try {
            
            const role = await this.roleservice.GetRole(req.user)

            if(!role){
                return reply.status(HttpStatus.UNAUTHORIZED).send("UNAUTHORIZED")
            }

            return reply.status(HttpStatus.OK).send({
                "data":role
            })
            
        } catch (error) {
            reply.status(HttpStatus.SERVICE_UNAVAILABLE).send({
                "massage":"error on server",
            })
        }
        
    }
}
