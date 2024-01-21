// Middleware d'authentification (JWT)
const authJwt = require("./authJwt");

// Middleware de vérification de l'inscription
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt, // Exportation du middleware d'authentification
  verifySignUp // Exportation du middleware de vérification de l'inscription
};
