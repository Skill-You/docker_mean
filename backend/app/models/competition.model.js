const mongoose = require("mongoose");

const Competition = mongoose.model(
  // Définition du modèle de données pour les compétitions
  "Competition",
  new mongoose.Schema({
    competitionName: {
      type: String,
      required: true // Le nom de la compétition est requis
    },
    organiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // L'ID de l'organisateur de la compétition, référence à un utilisateur
    },
    shortCode: {
      type: String,
      required: true // Le code court de la compétition est requis
    },
    competitionLogo: {
      type: String,
      required: false // Le logo de la compétition est facultatif
    },
    competitionSettings: {
      type: String,
      required: false // Les paramètres de la compétition sont facultatifs
    },
    competitionDescription: {
      type: String,
      required: false // La description de la compétition est facultative
    },
    competitionSeason: {
      type: String,
      default: "2023/2024",
      required: false // La saison de la compétition, par défaut à "2023/2024", est facultative
    },
    competitionCountry: {
      type: String,
      default: "ae",
      required: false // Le pays de la compétition, par défaut à "ae" (code pays), est facultatif
    },
    competitionYear: {
      type: String,
      default: "2023/2024",
      required: false // L'année de la compétition, par défaut à "2023/2024", est facultative
    },
    competitionEnd: {
      type: Date,
      default: Date.now,
      required: false // La date de fin de la compétition, par défaut à la date actuelle, est facultative
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // L'ID de l'utilisateur associé à la compétition, référence à un utilisateur
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false // La date de création de la compétition, par défaut à la date actuelle, est facultative
    }
  })
);

module.exports = Competition;
