const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { client } = require("../config/auth.config");

// Middleware pour gérer les autorisations CORS (Cross-Origin Resource Sharing)
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "OPTIONS, DELETE, POST, GET, PATCH, PUT");
    res.setHeader('Access-Control-Allow-Credentials', "true")
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', 1728000);
    next();
  });

  // Route pour l'inscription d'un utilisateur
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail, // Vérifie si le nom d'utilisateur ou l'e-mail existe déjà
      verifySignUp.checkRolesExisted // Vérifie les rôles d'utilisateur existants
    ],
    controller.signup // Contrôleur pour l'inscription
  );

  // Route pour la connexion d'un utilisateur
  app.post("/api/auth/signin", controller.signin); // Contrôleur pour la connexion

  // Route pour la déconnexion d'un utilisateur
  app.post("/api/auth/signout", controller.signout); // Contrôleur pour la déconnexion
};
