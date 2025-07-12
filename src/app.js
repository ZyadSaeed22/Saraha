import express from "express";
import connection from "./database/connection.js";
import authRouter from "./Modules/Auth/auth.controller.js";
import { userRouter } from "./Modules/User/User.controller.js";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);

const bootstrap = () => {
  connection();
  app.
    listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    }).on("error", (err) => {
      console.log("something went wrong on connecting on server", { err });
    });
};

export default bootstrap;














