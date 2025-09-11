import express from "express";
import router from "./routes/user.routes.js";
import userRouter from "./routes/mission.route.js";

const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

app.use("/benevole", router);

app.use("/mission", userRouter);

//--------------------------------------------------------------le JWT-------------------------------------------------
const PasswordAdmin="adminasso";
const saltRounds=10;
bcrypt.hash(PasswordAdmin,saltRounds,(err,hash)=>{
    if(err){
        console.error(err);
        console.log('mdp invalide');
    }else{
        console.log(hash);
    }   
});


app.listen(3000, () => {
  console.log("server MTR launched in ::: http://localhost:3000");
  
});