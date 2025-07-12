import { Router } from "express";
import { signup,login } from "./Services/auth.service.js";

const authRouter = Router();   // ممكن اسمى اى اسم مش شرط ده 

authRouter.post("/signup", signup);
authRouter.post("/login",login)

export default authRouter;