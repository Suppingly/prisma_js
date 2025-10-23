import { prisma } from "../app.js";

class UserService{
    async GetUsers(){
        try{
            return await prisma.user.findMany();
        } catch(err){
            console.error("Error fetching users:",err)
        }
    }
    async createUser({name,email}){
        return prisma.user.create({
            data:{
                name,
                email
            }
        })
    }
    async updateUser({id,name,email}){
        return prisma.user.update({
            where:{
                id:String(id),
            },
            data:{
                name,
                email
            }
        })
    }
    async searchUsersByName(name){
        try{
            return await prisma.user.findMany({
                where:{
                    name:{
                        contains:name,
                        mode:'insensitive'
                    },
                },
                select:{
                    name:true,
                }
            })
        }
        catch (err){
            console.error("Error searching users by name:",err)
            return []
        }
    }
}
export default UserService