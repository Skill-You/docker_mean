const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectId;
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

// Middleware pour vérifier le token JWT
verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(" ")[1];
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!" // Message d'erreur en cas de token invalide
          });
        }
        req.shortcode = decoded.shortcode;
        req.role = decoded.role;
        req.competition = decoded.role === "coach" ? decoded.competition : null;
        req.userId = decoded.id;
        next();
      });
    } else {
      res.status(401).json({ message: "No token provided" }); // Message d'erreur si aucun token n'est fourni
    }
  } catch (error) {
    res.status(401).json({ message: "No token provided" }); // Message d'erreur si une exception se produit
  }
};

// Middleware pour vérifier si un utilisateur est authentifié
isAuthenticated = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" }); // Message d'erreur si aucun token n'est fourni
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!" // Message d'erreur en cas d'authentification échouée
      });
    }
    req.shortcode = decoded.shortcode;
    req.role = decoded.role;
    req.competition = decoded.role === "coach" ? decoded.competition : null;
    req.userId = decoded.id;
    next();
  });
};

// Middleware pour vérifier si un utilisateur est un administrateur
isAdmin = async (req, res, next) => {
  const { userId, role } = req;
  if (role === "admin" || role === "superadmin") {
    next();
    return;
  } else {
    const reqUser = await User.findById(ObjectId(userId));
    User.findById(ObjectId(req.userId)).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err }); // Message d'erreur en cas d'erreur de recherche utilisateur
        return;
      }

      Role.find(
        {
          _id: { $in: user && user.roles ? user.roles : reqUser.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err }); // Message d'erreur en cas d'erreur de recherche de rôles
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin" || roles[i].name === "superadmin") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Admin Role!" }); // Message d'erreur si l'utilisateur n'a pas le rôle d'administrateur
          return;
        }
      );
    });
  }
};

// Middleware pour vérifier si un utilisateur est autorisé
isUserAllowed = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!" // Message d'erreur en cas d'authentification échouée
        });
      }
      req.shortcode = decoded.shortcode;
      req.role = decoded.role;
      req.competition = decoded.role === "coach" ? decoded.competition : null;
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "No token provided" }); // Message d'erreur si aucun token est fourni
  }
};

// Middleware pour vérifier si un utilisateur est un modérateur
isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err }); // Message d'erreur en cas d'erreur de recherche utilisateur
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err }); // Message d'erreur en cas d'erreur de recherche de rôles
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" }); // Message d'erreur si l'utilisateur n'a pas le rôle de modérateur
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAuthenticated,
  isAdmin,
  isModerator
};
module.exports = authJwt;
