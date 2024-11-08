import { Controller ,Res,Request, Get, HttpStatus, UseGuards} from '@nestjs/common';
import { AuditlogService } from './auditlog.service';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/auth/auth.Guard';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { LogResponseDto } from './Dto/response.dto';

@Controller('auditlog')
export class AuditlogController {
    constructor(private readonly auditlog:AuditlogService){}



    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Data Post successfully.',
        type:LogResponseDto
      })
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token to authorize the request',
        required: true,
    })
    async GetAlllog(@Res() reply:FastifyReply,@Request() req:any){
        try {

            const log = await this.auditlog.GetAlllog(req.user)

            if(!log){
                reply.status(HttpStatus.EXPECTATION_FAILED)
            }

            return reply.status(HttpStatus.OK).send(log)

        } catch (error) {
            return reply.status(HttpStatus.SERVICE_UNAVAILABLE).send("Error On Server")
        }
    }
}
