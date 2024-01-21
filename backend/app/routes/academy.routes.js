// Importation des modules nécessaires
const { authJwt } = require("../middlewares/");
const academy = require("../controllers/academy.controller");

// Exportation du module de gestion des routes
module.exports = function (app) {
  // Middleware permettant de gérer les en-têtes de requête
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Route pour la création d'une académie
  app.post("/academy/create", authJwt.isAuthenticated, academy.createAcademy);

  // Route pour obtenir la liste de toutes les académies
  app.get("/academy/all", authJwt.isAuthenticated, academy.getAllAcademys);

  // Route pour obtenir une académie par son ID
  app.get("/academy/:id", authJwt.isAuthenticated, academy.getAcademyById);

  // Route pour mettre à jour une académie par son ID
  app.post(
    "/academy/update/:id",
    authJwt.isAuthenticated,
    academy.updateAcademy
  );

  // Route pour mettre à jour l'entraîneur d'une académie par son ID
  app.post(
    "/academy/updatecoach/:id",
    authJwt.isAuthenticated,
    academy.updateAcademyCoach
  );

  // Route pour supprimer une académie par son ID
  app.post(
    "/academy/delete/:id",
    authJwt.isAuthenticated,
    academy.deleteAcademy
  );

  // Route pour supprimer toutes les académies
  app.post(
    "/academy/delete/all",
    authJwt.isAuthenticated,
    academy.deleteAllAcademys
  );

  // Route pour obtenir une académie par son nom
  app.post(
    "/academy/academybyname",
    authJwt.isAuthenticated,
    academy.getAcademyByName
  );

  // Route pour obtenir les académies dirigées par un entraîneur donné
  app.get(
    "/academy/academybycoach/:id",
    authJwt.isAuthenticated,
    academy.getAcademyByCoach
  );

  // Route pour obtenir les académies pour une compétition donnée
  app.get(
    "/academy/forcompetition/:competition",
    authJwt.isAuthenticated,
    academy.forCompetition
  );

  // Route pour obtenir les académies pour un code court donné
  app.get(
    "/academy/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    academy.forShortCode
  );
};
