const mongoose = require("mongoose");

// Définition du modèle de données pour une équipe
const Team = mongoose.model(
  "Team",
  new mongoose.Schema({
    teamName: {
      type: String,
      required: true // Le nom de l'équipe est requis
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // Référence à un utilisateur
    },
    academy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Academy" // Référence à une académie
    },
    shortcode: {
      type: String // Code court de l'équipe (optionnel)
    },
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition" // Référence à une compétition
    },
    leagues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "League" // Référence à des ligues (peut être multiple)
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now, // Date de création par défaut
      required: false // Pas obligatoire
    }
  })
);

module.exports = Team;
