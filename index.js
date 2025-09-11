import express from "express";
import router from "./routes/user.routes.js";
import userRouter from "./routes/mission.route.js";

const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

app.use("/benevole", router);

app.use("/mission", userRouter);

//--------------------------------------------------------------le JWT-------------------------------------------------
// Mot de passe en clair (à hacher)
const PasswordAdminAsso = 'adminasso';

// Nombre de tour de salt, ici 2 puissance 10 passages a executer l'algorythme mais c'est plus lent mais plus cher pour l'attaquant
const saltRounds = 10;  

async function run() {
  try {
    // Génère le hash du mot de passe
    const hashedPassword = await bcrypt.hash(PAsswordAdminAsso, saltRounds);
    console.log('mot de pass hashed:', hashedPassword);

    // Vérifie ensuite le mot de passe
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Mot de passe correct ?', isMatch);
  } catch (err) {
    console.error('Erreur bcrypt:', err);
  }
}


app.listen(3000, () => {
  console.log("server MTR launched in ::: http://localhost:3000");
  
});