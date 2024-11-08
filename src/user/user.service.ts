import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuditlogService } from 'src/auditlog/auditlog.service';


@Injectable()
export class UserService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly audlog:AuditlogService
    ){}


    async hash(password:string):Promise<string>{
        try {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            return hash
            
        } catch (error) {
            throw Error('error in hash password !')
        }
        
    }
    

    async compare(password:string,hash:string){
        try {
            const isMatch = await bcrypt.compare(password, hash);
            return isMatch
        } catch (error) {
            throw Error("Error In Compare")
        }
    }


    async AddUser(data:Prisma.UserCreateInput):Promise<User>{

        try {
            

            data.password = await this.hash(data.password)
            
            const user = await  this.prisma.user.create({data})

            return user
            
        } catch (error) {
            
        }
    }

    async FindUserByEmail(email:string):Promise<User>{
        try {

            const user = await this.prisma.user.findUnique({
                where : {email},
                include: {
                    roles:{
                        include:{
                            role:{
                                select:{
                                    roleName:true,
                                }
                            }
                        }
                    }
                },
            })

            
            return user
        } catch (error) {
            throw Error("error in Server on Find User By Email")
        }
    }

    async FindUserByid(id:string){
        try {

            // const user = await this.prisma.user.findUnique({
            //     where : {id:+id},
            //     include: {
            //         password: false,
            //         roles:{
            //             include:{
            //                 role:{
            //                     select:{
            //                         roleName:true
            //                     }
            //                 }
            //             }
            //         }
            //     },
            // })

            const user = await this.prisma.user.findUnique({
                where: { id: +id },
                select: {
                    name:true,
                    email:true,
                    createdAt:true,
                    updatedAt:true,
                    password: false,
                    roles: {
                        select: {
                            roleId:true,
                            role: {
                                select: {
                                    roleName: true,
                                    permissions:{
                                        select:{
                                            permission:{
                                                select:{
                                                    permissionName:true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

           await this.audlog.AddLog({
                userId: id,
                action: `Find user `,
                resource: `${user.name}`,
                resourceId: `${id}`,
                details: JSON.stringify({ "message": ` ${user.name} Get User By Id ${Date.now()}`,"user":`${user.name}` })
              })

     
            return user
            
        } catch (error) {
            throw Error("Error in Server on Find User By Id")
        }
    }

    async ChangeRoleUser(admin: any, user_id: number, role_id: number) {
        try {
            if (admin.role === "admin") {

                const existingUserRole = await this.prisma.userRole.findFirst({
                    where: { userId: user_id }
                });
    
                if (existingUserRole) {

                    await this.prisma.userRole.delete({
                        where: { userId_roleId: { userId: user_id, roleId: existingUserRole.roleId } }
                    });
                }
    
                await this.prisma.userRole.create({
                    data: {
                        userId: user_id,
                        roleId: role_id
                    }
                });

                await this.audlog.AddLog({
                    userId: admin.id,
                    action: `Find user `,
                    resource: `${admin.name}`,
                    resourceId: `${admin.id}`,
                    details: JSON.stringify({ "message": ` the  ${admin.name} Chnage Role of  user id ${user_id} ${Date.now()}`,"user":`${admin.name}` })
                  })

                
    
                return await this.FindUserByid(user_id.toString());
            }
    
            return null;
        } catch (error) {
            throw new Error("Error in Server on Change Role user");
        }
    }


    async GetAllUser(user_id:string){
        try {

            const user = await this.FindUserByid(user_id)

            const hasAdminRole = user.roles.some(role => role.role.roleName === "admin");

            if(!hasAdminRole){
                return false
            }

            const users = await this.prisma.user.findMany({
                include:{
                    
                    roles:{
                        select:{
                            role:{
                                select:{
                                    roleName:true,
                                    id:true,
                                    description:false,
                                    createdAt:false,
                                    
                                }
                            },
                            
                            
                        }
                    }
                }
            })


            return users
            
            
        } catch (error) {
            throw Error("Error in Server On Get All User")
        }
    }
}
