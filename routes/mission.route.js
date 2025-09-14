// ==========================
// Fichier : mission.route.js
// ==========================
import { authMiddleware } from "../middlewares/auth.js";
import express from "express";
import {
  getAllMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission
} from "../controllers/mission.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Missions
 *   description: Gestion des missions
 */

/**
 * @swagger
 * /mission/get:
 *   get:
 *     summary: Récupérer toutes les missions
 *     tags: [Missions]
 *     responses:
 *       200:
 *         description: Liste des missions
 */
router.get("/get", getAllMissions);

/**
 * @swagger
 * /mission/{id}:
 *   get:
 *     summary: Récupérer une mission par ID
 *     tags: [Missions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mission trouvée
 *       404:
 *         description: Mission non trouvée
 */
router.get("/:id", getMissionById);

/**
 * @swagger
 * /mission/post:
 *   post:
 *     summary: Créer une mission (protégé par JWT)
 *     tags: [Missions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, date_mission, association_id]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               date_mission: { type: string, format: date-time }
 *               association_id: { type: integer }
 *     responses:
 *       201:
 *         description: Mission ajoutée
 *       401:
 *         description: Token manquant ou invalide
 */
router.post("/post", authMiddleware, createMission);

/**
 * @swagger
 * /mission/{id}:
 *   put:
 *     summary: Mettre à jour une mission
 *     tags: [Missions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, date_mission]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               date_mission: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Mission mise à jour
 *       404:
 *         description: Mission non trouvée
 */
router.put("/:id", updateMission);

/**
 * @swagger
 * /mission/{id}:
 *   delete:
 *     summary: Supprimer une mission
 *     tags: [Missions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mission supprimée
 *       404:
 *         description: Mission non trouvée
 */
router.delete("/:id", deleteMission);

export default router;
