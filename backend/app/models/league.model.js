const mongoose = require("mongoose");

// Définition du modèle de données pour une ligue
const League = mongoose.model(
  "League",
  new mongoose.Schema({
    leagueName: {
      type: String,
      required: true  // Champ de nom de la ligue, obligatoire
    },
    leagueAgeLimit: {
      type: String,
      required: true  // Limite d'âge de la ligue, obligatoire
    },
    shortcode: {
      type: String  // Code court de la ligue (facultatif)
    },
    year: {
      type: String,
      default: 2024  // Année par défaut pour la ligue (facultatif)
    },
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition"  // Référence à une compétition (facultatif)
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"  // Référence à un utilisateur (facultatif)
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: false  // Date de création de la ligue (facultatif)
    }
  })
);

module.exports = League;
