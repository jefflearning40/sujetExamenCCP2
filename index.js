import express from "express";

const app = express();
const port = 3000;

// Page utilisateur générique
app.get("/user", (req, res) => {
  res.send("Welcome to Manager Task Register - User space! choice :benevol or admin");
});
// Enregistrement bénévole
app.get("/user/benevol", (req, res) => {
  res.send("Welcome to Manager Task Register - Benevol register or connect space!");
});
// Enregistrement bénévole
app.get("/user/benevol/register", (req, res) => {
  res.send("Welcome to Manager Task Register - Benevol register space!");
});

// Connexion bénévole
app.get("/user/benevol/connect", (req, res) => {
  res.send("Welcome to Manager Task Register - Benevol connect space!");
});

// Connexion admin
app.get("/user/admin", (req, res) => {
  res.send("Welcome to Manager Task Register - Admin connect or manager space!");
});

// Espace manager (admin)
app.get("/user/admin/manager", (req, res) => {
  res.send("Welcome to Manager Task Register - Admin manager space!");
});

// Espace connect (admin)
app.get("/user/admin/connect", (req, res) => {
  res.send("Welcome to Manager Task Register - Admin connect space!");
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
