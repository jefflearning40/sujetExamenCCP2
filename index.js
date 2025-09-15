import express from "express";                          // on importe le framework express
import dotenv from "dotenv";                            // pour lire les variables d'environnement
import userRoutes from "./routes/user.route.js";        // routes utilisateurs
import missionRoutes from "./routes/mission.route.js";  // routes missions
import "./db.js";                                       //  connexion MySQL

// Swagger
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();
const app = express();

// Middleware pour parser JSON et formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// Swagger configuration
// =====================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API MTR",
      version: "1.0.0",
      description: "Documentation auto-générée avec Swagger pour l'API MTR",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // fichiers contenant les commentaires JSDoc @swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// =====================
// Routes principales
// =====================
app.use("/user", userRoutes);
app.use("/mission", missionRoutes);

// =====================
// Lancement du serveur
// =====================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
  console.log(`📖 Documentation Swagger : http://localhost:${port}/api-docs`);
});
