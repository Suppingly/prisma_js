import express from "express";
import UserController from "../controller/userController.js";

const router=express.Router()
const userController=new UserController()

router.post('/',(req,res)=>userController.createUser(req,res))
router.get('/',(req,res)=>userController.getUsers(req,res))
router.put('/',(req,res)=>userController.updateUserUser(req,res))
router.get('/search',(req,res)=>userController.searchUsersByName(req,res))

export default router