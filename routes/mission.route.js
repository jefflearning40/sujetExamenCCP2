// ==========================
// Fichier : mission.route.js
// ==========================

import express from "express";
import {
  getAllMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission
} from "../controllers/mission.controller.js";

const router = express.Router();

// Ici on délègue tout au controller
router.get("/get", getAllMissions);
router.get("/:id", getMissionById);
router.post("/post", createMission);
router.put("/:id", updateMission);
router.delete("/:id", deleteMission);

export default router;
