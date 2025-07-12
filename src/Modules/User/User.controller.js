import { Router } from "express";
import { createUser,
deleteAllUsers, 
deleteUser, 
getAllUsers,
 getUser, 
updateUser } from "./Service/User.service.js";

export const userRouter = Router();

userRouter.post("/createUser", createUser);
userRouter.delete("/deleteAllUsers", deleteAllUsers);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/updateUser/:id", updateUser);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.get("/:id", getUser);




