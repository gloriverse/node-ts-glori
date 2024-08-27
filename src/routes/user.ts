import { createUser } from "@/controllers/users";
import express from "express";

const userRouter = express.Router();

userRouter.post("/users", createUser);

export default userRouter;
