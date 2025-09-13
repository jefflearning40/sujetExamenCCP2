import express from "express";                          //on importe le framwork express
import dotenv from "dotenv";                            //pour lire les variables d'environnement qui sont dans le fichier .env
import userRoutes from "./routes/user.route.js";        //on importe les routes liées aux utilisateurs
import missionRoutes from "./routes/mission.route.js";  //on importe les routes liees aux missions
import "./db.js";                                       // ⚡ on importe la connexion MySQL (pas besoin de la réexporter ici)

dotenv.config();                                        //dotenv lit le fichier .env et ajoute les variables
const app = express();                                 //ici, nous creons une instance de l'application express

app.use(express.json());                              // On crée une instance de l’application Express


//Permet de lire les données envoyées par un formulaire HTML (méthode POST) et de les récupérer facilement dans req.body.”
app.use(express.urlencoded({ extended: true }));

// On définit la route de base "/user" et toutes les routes définies dans user.route.js commenceront par /user
app.use("/user", userRoutes);
// On définit la route de base "/mission" et toutes les routes définies dans mission.route.js commenceront par /mission
app.use("/mission", missionRoutes);

const port = process.env.PORT || 3000;
//si il ne trouve pas de port dans le env il prendra le port 3000 par default
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
