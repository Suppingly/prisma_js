import express from "express";
import UserController from "../controller/userController.js";

const router=express.Router();
const userController=new UserController();

router.get('/',(req,res)=>userController.getUsers(req,res));
router.post('/',(req,res)=>userController.createUser(req,res));
router.put('/:id',(req,res)=>userController.updateUser(req,res));
router.get('/search/byName',(req,res)=>userController.searchUsersByName(req,res));
router.get('/search/byEmail',(req,res)=>userController.searchUsersByEmail(req,res));
router.delete('/',(req,res)=>userController.deleteUser(req,res));

router.get('/posts',(req,res)=>userController.getPosts(req,res));
router.post('/posts',(req,res)=>userController.createPost(req,res));
router.put('/posts/:id',(req,res)=>userController.updatePost(req,res))
router.delete('/posts',(req,res)=>userController.deletePost(req,res))

export default router;