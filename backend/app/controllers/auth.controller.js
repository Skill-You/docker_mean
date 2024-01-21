// Importation des modules nécessaires
const config = require("../config/auth.config"); // Configuration de l'authentification
const db = require("../models"); // Importation des modèles de la base de données
const User = db.user; // Modèle User
const Role = db.role; // Modèle Role

const jwt = require("jsonwebtoken"); // JWT pour la gestion des tokens d'authentification
const bcrypt = require("bcryptjs"); // Bibliothèque pour le hachage des mots de passe

// Contrôleur pour l'inscription d'un nouvel utilisateur
exports.signup = (req, res) => {
  // Création d'un nouvel utilisateur avec les données de la requête
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8) // Hachage du mot de passe
  });

  // Sauvegarde de l'utilisateur dans la base de données
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      // Si des rôles sont spécifiés dans la requête
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          // Attribution des rôles à l'utilisateur
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      // Si aucun rôle spécifié, attribuer le rôle "user" par défaut
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

// Contrôleur pour l'authentification d'un utilisateur
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate(["roles", "__v", "competition"])
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Vérification de la validité du mot de passe
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          shortcode: user.shortcode,
          role: user.roles[0].name,
          competition: user.roles.every((x) => x.name === "coach")
            ? user.competition
            : null
        },
        config.secret,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400 // 24 heures
        }
      );

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      // Réponse avec le token d'authentification et les informations de l'utilisateur
      res.status(200).send({
        token: token,
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        roles: authorities,
        competition: user.competition,
        shortcode: user.shortcode
      });
    });
};

// Contrôleur pour la déconnexion d'un utilisateur
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
