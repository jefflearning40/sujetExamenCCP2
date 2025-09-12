import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import missionRoutes from "./routes/mission.route.js";
import "./db.js"; // ⚡ on importe la connexion MySQL (pas besoin de la réexporter ici)

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/mission", missionRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});
