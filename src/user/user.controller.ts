import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards,Request, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';
import { CreateUserDto } from './Dto/createuser.Dto';
import { JwtAuthGuard } from 'src/auth/auth.Guard';
import { ChangeRoleUserDto } from './Dto/changeroleuser.dto';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { RoleResponseUserDto } from './Dto/roleuserresponse.dto';
import { UsergResponseDto } from './Dto/userresponse.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userserivec:UserService){}


    @Post()
    @ApiResponse({
        status: 200,
        description: 'Data Get successfully.',
        type: UsergResponseDto,
      })
    async AddUser(@Res() reply: FastifyReply , @Body() data:CreateUserDto){
        
        return reply.status(HttpStatus.CONFLICT).send("The App Stell Demo")
        
        try {
            
            let user: boolean | { name: string; id: number; email: string; password: string}

            user = await this.userserivec.FindUserByEmail(data.email)

            if(user){
                return reply.status(HttpStatus.FOUND).send({
                    message:"User existing",
                    data:data.email
                    
                })
            }

            user =  await this.userserivec.AddUser(data)

            if(!user){
                return reply.status(HttpStatus.CONFLICT).send({
                    message:"Error On Create User"
                })
            }

            return reply.status(HttpStatus.OK).send({
                message:"User Create",
                data : user
            })
        } catch (error) {
            return reply.status(HttpStatus.SERVICE_UNAVAILABLE).send({
                success : false,
                message:"Error in Server"
            })
        }
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token to authorize the request',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'Data Get successfully.',
        type: [UsergResponseDto],
      })
    async GetAllUsers(@Res() reply:FastifyReply,@Request() req:any){
        try {

            const users = await this.userserivec.GetAllUser(req.user.id)
            
            if(!users){
               return reply.status(HttpStatus.UNAUTHORIZED)
            }

            return reply.status(HttpStatus.OK).send({
                data:users
            })
            
        } catch (error) {
            reply.status(HttpStatus.SERVICE_UNAVAILABLE).send("Error On Server")
        }
    }

    @Post("change")
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        description: 'Bearer token to authorize the request',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'Data Post successfully.',
        type:RoleResponseUserDto
      })
    async ChangeUserRole(@Res() reply:FastifyReply,@Request() req:any,@Body() data:ChangeRoleUserDto){
        try {

            const user = await this.userserivec.ChangeRoleUser(req.user,data.user_id,data.role_id)

            if(!user){
                return reply.status(HttpStatus.UNAUTHORIZED)
            }

            return reply.status(200).send(user)
            
        } catch (error) {
            reply.status(HttpStatus.SERVICE_UNAVAILABLE).send("Error On Server")
        }
    }
    
}
