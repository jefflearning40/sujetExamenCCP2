// On importe la librairie faker pour générer des données fictives réalistes
import { faker } from "@faker-js/faker";

// On importe notre connexion à la base de données définie dans db.js
import db from "./db.js";

// Fonction asynchrone pour générer un certain nombre de 10 missions 

const generateMissions = async (count = 10) => {
  // Boucle qui va s’exécuter "count" fois pour insérer plusieurs missions
  for (let i = 0; i < count; i++) {
    // Génération d’un titre aléatoire 
    const title = faker.company.catchPhrase();

    // Génération d’une description aléatoire avec lorem
    const description = faker.lorem.sentence();

    // Génération d’une date aléatoire dans le futur
    const date_mission = faker.date.future();

    // ID d’association associé à la mission je commence avec id=1
    const association_id = 1;

    // Requête SQL préparée pour insérer une mission, la fonction insrt into ajoute une nouvelle ligne dans la table mission
    const sql = `
      INSERT INTO missions (title, description, date_mission, association_id)
      VALUES (?, ?, ?, ?)
    `;

    // Exécution de la requête SQL avec les valeurs générées.j'attends la fin d'une insertion avant de passer a la suivante
    //et si ca ne fonctionne pas, il envoie une erreur sinon il continu
    await new Promise((resolve, reject) => {
      db.query(sql, [title, description, date_mission, association_id], (err) => {
        if (err) return reject(err); // Si erreur → rejeter la promesse
        resolve(); // Sinon → marquer la requête comme terminée
      });
    });

    // Affiche dans la console chaque mission insérée avec succès
    console.log(`✅ Mission "${title}" insérée`);
  }

  // 🔑 Très important : fermer la connexion une fois toutes les insertions terminées
  db.end();
};

// On appelle la fonction pour insérer 20 missions dans la base de données
generateMissions(20);
