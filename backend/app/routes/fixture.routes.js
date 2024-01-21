// Import des modules middleware et du contrôleur des fixtures
const { authJwt } = require("../middlewares/");
const fixture = require("../controllers/fixture.controller");

// Export de la configuration des routes
module.exports = function (app) {
  // Middleware pour gérer les en-têtes CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Route pour créer une fixture (avec authentification requise)
  app.post("/fixture/create", authJwt.isAuthenticated, fixture.createFixture);

  // Route pour obtenir toutes les fixtures (avec authentification requise)
  app.get("/fixture/all", authJwt.isAuthenticated, fixture.getAllFixture);

  // Route pour obtenir une fixture par ID (avec authentification requise)
  app.get("/fixture/:id", authJwt.isAuthenticated, fixture.getFixtureById);

  // Route pour approuver une fixture par ID (avec authentification requise)
  app.post(
    "/fixture/approve/:id",
    authJwt.isAuthenticated,
    fixture.updateFixture
  );

  // Route pour mettre à jour une fixture par ID (avec authentification requise)
  app.post(
    "/fixture/update/:id",
    authJwt.isAuthenticated,
    fixture.updateFixture
  );

  // Route pour supprimer une fixture par ID (avec authentification requise)
  app.post(
    "/fixture/delete/:id",
    authJwt.isAuthenticated,
    fixture.deleteFixture
  );

  // Route pour supprimer toutes les fixtures (avec authentification requise)
  app.post(
    "/fixture/delete/all",
    authJwt.isAuthenticated,
    fixture.deleteAllFixture
  );

  // Route pour obtenir les fixtures pour une compétition spécifique (avec authentification requise)
  app.get(
    "/fixture/forcompetition/:competition",
    authJwt.isAuthenticated,
    fixture.forCompetition
  );

  // Route pour obtenir les fixtures pour un code court spécifique (avec authentification requise)
  app.get(
    "/fixture/forshortcode/:shortcode",
    authJwt.isAuthenticated,
    fixture.forShortCode
  );
};
