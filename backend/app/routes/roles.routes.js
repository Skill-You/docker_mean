// Importation des modules requis
const { authJwt } = require("../middlewares"); // Import du module de gestion de l'authentification JWT
const controller = require("../controllers/roles.controller"); // Import du contrôleur des rôles

// Exportation de la définition des routes pour les rôles
module.exports = function (app) {
  // Middleware permettant d'autoriser certains en-têtes CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Route pour obtenir tous les rôles
  app.get("/api/roles/all", [authJwt.verifyToken], controller.allRoles);
};
