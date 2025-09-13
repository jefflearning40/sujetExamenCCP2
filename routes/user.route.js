// ==========================
// Fichier : user.route.js
// ==========================

import express from "express";
import { //importation du crud du controler
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

const router = express.Router();

// Routes qui appellent les fonctions du controller
router.get("/get", getAllUsers);
router.get("/:id", getUserById);
router.post("/post", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
