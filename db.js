import mysql from "mysql2";                   // on importe le package mysql2 pour se connecter a la base de données MySQL

import dotenv from "dotenv";                 // pour lire les variables d'environnement qui sont dans le fichier .env

dotenv.config();                            // dotenv lit le fichier .env et ajoute les variables

const db = mysql.createConnection({         //on cree une connexion a la base de données depuis le fichier .Eenv
  host: process.env.DB_HOST,     
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {                       //ici on se connect et si on y arrive pas, on envoie un message d'erreur
  if (err) {
    console.error("❌ Erreur de connexion MySQL :", err); // pour afficher l'erreur dans une console
    return;
  }
  console.log("✅ Connecté à MySQL"); //si la connexion est reussie, on avoir le message dans la console
});

export default db;    //on envoie la fonction db(database) vers les autres fichiers qui en ont besoin
