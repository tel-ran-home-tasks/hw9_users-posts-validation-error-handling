import express from "express";
import {UserController} from "../controllers/userController.js";
import {userService} from "../config/appConfig.js";

export const userRouter = express.Router();
const userController = new UserController(userService)

userRouter.get('/', (req, res) => {
userController.getAllUsers(res)
})
userRouter.post('/', async (req, res) => {
    await userController.addUser(req, res)
})
userRouter.delete('/', async (req, res) => {
    await userController.removeUser(req, res)
})
userRouter.put('/', async (req, res) => {
    await userController.updateUser(req, res)
})
userRouter.get('/user', (req, res) => {
    userController.getUser(req, res)
})