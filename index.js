import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import missionRoutes from "./routes/mission.route.js"; // ✅ import mission routes

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Routes user
app.use("/user", userRoutes);

// Routes mission
app.use("/mission", missionRoutes);

// Lancement du serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
