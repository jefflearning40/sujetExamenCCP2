import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import db from "./db.js"; // ta connexion MySQL

const generateUsers = async (count = 20) => {
  for (let i = 0; i < count; i++) {
    // Génération de données aléatoires avec faker
    const name = faker.person.fullName();       // nom complet
    const email = faker.internet.email();       // email unique
    const password = "password123";             // mot de passe par défaut
    const password_hash = await bcrypt.hash(password, 10); // hachage sécurisé
    const role = faker.helpers.arrayElement(["BENEVOLE", "ASSOCIATION"]); // rôle aléatoire

    // Requête SQL d’insertion
    const sql = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `;

    await new Promise((resolve, reject) => {
      db.query(sql, [name, email, password_hash, role], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    console.log(`✅ Utilisateur "${name}" (${role}) inséré`);
  }

  // Fermeture de la connexion MySQL
  db.end();
};

// Génère 20 utilisateurs factices
generateUsers(20);
