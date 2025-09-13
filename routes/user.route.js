// ==========================
// Fichier : user.route.js
// ==========================

import express from "express";

// On importe toutes les fonctions CRUD + login depuis le controller
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser   // ✅ on ajoute la fonction login
} from "../controllers/user.controller.js";

const router = express.Router();

// ==================== ROUTES UTILISATEUR ====================

// Récupérer tous les utilisateurs
router.get("/get", getAllUsers);

// Récupérer un utilisateur par ID
router.get("/:id", getUserById);

// Créer un nouvel utilisateur
router.post("/post", createUser);

// Mettre à jour un utilisateur existant
router.put("/:id", updateUser);

// Supprimer un utilisateur
router.delete("/:id", deleteUser);

// ==================== ROUTE LOGIN ====================
// Permet à un utilisateur de se connecter avec email + password
// Retourne un token JWT en cas de succès
router.post("/login", loginUser);

export default router;
