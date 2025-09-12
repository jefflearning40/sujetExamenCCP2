import { Router } from "express";

const router = Router();

// Page utilisateur générique
router.get("/", (req, res) => {
  res.send("Welcome to Manager Task Register - User space! choice : benevol or admin");
});

// Enregistrement bénévole
router.get("/benevol", (req, res) => {
  res.send("Welcome to Manager Task Register - Benevol register or connect space!");
});

// Enregistrement bénévole
router.get("/benevol/register", (req, res) => {
  res.send("Welcome to Manager Task Register - Benevol register space!");
});

// Connexion bénévole
router.get("/benevol/connect", (req, res) => {
  res.send("Welcome to Manager Task Register - Benevol connect space!");
});

// Connexion admin
router.get("/admin", (req, res) => {
  res.send("Welcome to Manager Task Register - Admin connect or manager space!");
});

// Espace manager (admin)
router.get("/admin/manager", (req, res) => {
  res.send("Welcome to Manager Task Register - Admin manager space!");
});

// Espace connect (admin)
router.get("/admin/connect", (req, res) => {
  res.send("Welcome to Manager Task Register - Admin connect space!");
});

export default router;
