import { 
    Register,
    Login,
    getAllUsers,
    getUserById 
 } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import express from "express";
const userRouter = express.Router();


userRouter.post("/register", Register);
userRouter.post("/login", Login);

// protected route to get all users

userRouter.get("/users", authMiddleware, getAllUsers);
userRouter.get("/users/:id", authMiddleware, getUserById);

export default userRouter;