import { error } from "console";
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
            res.status(500).json({error:"Internal Server Error"})
        }
    }
    async createUser(req,res){
        try{
            const user=await this.userService.createUser(req.body)
            res.status(201).json(user)
        }
        catch (err){
            console.error("Errorcreating user:",err)
            res.status(500).json({error:"Internal Server Error"})
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
            console.error("Error updating user:",err)
            res.status(500).json({error:"Internal Server Error"})
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
            res.status(500).json({error:"Internal Server Error"})
        }
    }
}

export default UserController