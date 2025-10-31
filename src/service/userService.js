import { prisma } from "../app.js";

class UserService{
    async getUsers(){
        try{
            return await prisma.user.findMany();
        }
        catch (err){
            console.error("Error fetching users:",err)
        }
    }
    async createUser({name,email}){
        try{
            return prisma.user.create({
                data:{
                    name,
                    email
                }
            })
        }
        catch (err){
            console.error("Error creating user:",err)
        }
    }
    async updateUser({id,name,email}){
        try{
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
        catch (err){
            console.error("Error updating info about user:",err)
        }
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
                    id:true
                }
            })
        }
        catch (err){
            console.error("Error searching users by name:",err)
            return []
        }
    }
    async deleteUser(email){
        try{
            return await prisma.user.delete({
                where:{
                    email:email
                },
                select:{
                    name:true,
                    email:true
                }
            })
        }
        catch (err){
            console.error("Error deleting user by email:",err)
            return null
        }
    }
    async searchUsersByEmail(email){
        try{
            return await prisma.user.findUnique({
                where:{
                    email:email
                },
                select:{
                    name:true,
                    email:true,
                    id:true
                }
            })
        }
        catch (err){
            console.error("Error searching user by email:",err)
            return []
        }
    }
    async getPosts(){
        try{
            return await prisma.post.findMany();
        }
        catch (err){
            console.error("Error fetching posts:",err)
        }
    }
    async createPost(title,content,authorId){
        try{
            const createdAt=new Date();
            const updatedAt=createdAt
            return await prisma.post.create({
                data:{
                    title,
                    content,
                    authorId,
                    createdAt,
                    updatedAt
                }
            })
        }
        catch (err){
            console.error("Error creating post:",err)
        }
    }
    async updatePost({id,title,content,published}){
        try{
            if (typeof published=='boolean'){
                return await prisma.post.update({
                    where:{
                        id:String(id),
                    },
                    data:{
                        title,
                        content,
                        published
                    }
                })
            }
            else{
                return null
            }
        }
        catch (err){
            console.error("Error updating post:",err)
        }
    }
    async deletePost(id){
        try{
            return await prisma.post.delete({
                where:{
                    id:String(id)
                },
                select:{
                    id:true,
                    title:true
                }
            })
        }
        catch (err){
            console.error("Error deleting post:",err)
        }
    }
}
export default UserService