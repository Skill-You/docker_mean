const mongoose = require("mongoose");

// Définition du modèle User
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    // Prénom de l'utilisateur
    firstname: {
      type: String
    },
    // Nom de l'utilisateur
    lastname: {
      type: String
    },
    // Nom d'utilisateur unique
    username: {
      type: String,
      required: true,
      unique: true
    },
    // Numéro de contact de l'utilisateur
    contact: {
      type: String
    },
    // Adresse e-mail de l'utilisateur
    email: {
      type: String,
      required: true
    },
    // Mot de passe de l'utilisateur
    password: {
      type: String,
      required: true
    },
    // Code court de l'utilisateur
    shortcode: {
      type: String,
      required: true
    },
    // Pays de compétition par défaut
    competitionCountry: {
      type: String,
      default: "AE"
    },
    // Liste des compétitions associées à l'utilisateur
    competition: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Competition"
      }
    ],
    // Rôles de l'utilisateur dans le club
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    // Créateur de l'utilisateur
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    // Date de création de l'utilisateur
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
    }
  })
);

module.exports = User;
