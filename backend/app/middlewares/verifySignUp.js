const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// Vérifie si le nom d'utilisateur ou l'adresse e-mail est en double dans la base de données
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Vérification du nom d'utilisateur
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      // Envoie une réponse d'erreur si le nom d'utilisateur est en double
      res.status(400).send({ message: "Échec ! Le nom d'utilisateur est déjà utilisé !", user: user });
      return;
    }

    // Vérification de l'adresse e-mail
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        // Envoie une réponse d'erreur si l'adresse e-mail est en double
        res.status(400).send({ message: "Échec ! L'adresse e-mail est déjà utilisée !" });
        return;
      }

      next();
    });
  });
};

// Vérifie si les rôles spécifiés existent dans la liste des rôles autorisés (ROLES)
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        // Envoie une réponse d'erreur si un rôle spécifié n'existe pas
        res.status(400).send({
          message: `Échec ! Le rôle ${req.body.roles[i]} n'existe pas !`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
