import express from "express";
import router from "./routes/user.routes.js";
import userRouter from "./routes/mission.route.js";

const app = express();

app.use(express.json());

app.use("/hello", router);

app.use("/users", userRouter);


app.listen(3000, () => {
  console.log("server demarré sur ::: http://localhost:3000");
  
});