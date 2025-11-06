import UserService from "../service/userService.js";

class UserController{
    constructor(){
        this.userService=new UserService()
    }
    async getUsers(req,res){
        try{
            const users=await this.userService.getUsers()
            res.status(200).json(users)
        }
        catch (err){
            console.error("Error fetching users:",err)
            res.status(500).json({error:"Internal Server Error fetching users"})
        }
    }
    async createUser(req,res){
        try{
            const user=await this.userService.createUser(req.body)
            res.status(201).json(user)
        }
        catch (err){
            console.error("Error creating user:",err)
            res.status(500).json({error:"Internal Server Error creating user"})
        }
    }
    async updateUser(req,res){
        try{
            const user=await this.userService.updateUser({
                id:req.params.id,
                name:req.body.name,
                email:req.body.email
            })
            res.status(200).json(user)
        }
        catch (err){
            console.error("Error updating info about user:",err)
            res.status(500).json({error:"Internal Server Error updating info about user"})
        }
    }
    async searchUsersByName(req,res){
        try{
            const { name }=req.body
            if (!name){
                return res.status(400).json({error: "Поле 'name' обязательно"})
            }
            const users=await this.userService.searchUsersByName(name)
            res.status(200).json(users)
        }
        catch (err){
            console.error("Error searching users by name:",err)
            res.status(500).json({error:"Internal Server Error searching users by name"})
        }
    }
    async deleteUser(req,res){
        try{
            const { email }=req.body
            if (!email){
                return res.status(400).json({error: "Поле 'email' обязательно"})
            }
            const success=await this.userService.deleteUser(email)
            if (!success){
                res.status(404).json({failed:`Пользователь не был найден или не был удален`})
            }
            else{
                res.status(200).json({successed:`Пользователь с именем '${success.name}' и почтой ${success.email} был успешно удален`})
            }
        }
        catch (err){
            console.error("Error deleting user:",err)
            res.status(500).json({error:"Internal Server Error deleting user"})
        }
    }
    async searchUsersByEmail(req,res){
        try{
            const { email }=req.body
            if (!email){
                return res.status(400).json({error: "Поле 'email' обязательно"})
            }
            const user=await this.userService.searchUsersByEmail(email)
            if (!user){
                res.status(404).json({failed:"Пользователя с таким email не найдено"})
            }
            else{
                res.status(200).json(user)
            }
        }
        catch (err){
            console.error("Error searching user by email:",err)
            res.status(500).json({error:"Internal Server Error searching user by email"})
        }
    }
    async getPosts(req,res){
        try{
            const posts=await this.userService.getPosts()
            res.status(200).json(posts)
        }
        catch (err){
            console.error("Error fetching posts:",err)
            res.status(500).json({error:"Internal Server Error fetching posts"})
        }
    }
    async createPost(req,res){
        try{
            const { title }=req.body
            const { content }=req.body
            const { authorId }=req.body
            const post=await this.userService.createPost(title,content,authorId)
            if (!post) res.status(400).json({error:"Error creating post"})
            res.status(201).json(post)
        }
        catch (err){
            console.error("Error creating post:",err)
            res.status(500).json({error:"Internal Server Error creating post"})
        }
    }
    async updatePost(req,res){
        try{
            const post=await this.userService.updatePost({
                id:req.params.id,
                title:req.body.title,
                content:req.body.content,
                published:req.body.published
            })
            if (!post){
                res.status(400).json({failed:"'published' должен содержать значение true или false"})
            }
            else{
                res.status(200).json(post)
            }
        }
        catch (err){
            console.error("Error updating post:",err)
            res.status(500).json({error:"Internal Server Error updating post"})
        }
    }
    async deletePost(req,res){
        try{
            const post=await this.userService.deletePost(req.body.id)
            res.status(200).json({successed:`Пост '${post.title}'(${post.id}) был успешно удален`})
        }
        catch (err){
            console.error("Error deleting post:",err)
            res.status(500).json({error:"Internal Server Error deleting post"})
        }
    }
}

export default UserController