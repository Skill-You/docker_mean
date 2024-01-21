const mongoose = require("mongoose");

// Définition du modèle "Fixture" avec Mongoose
const Fixture = mongoose.model(
  "Fixture",
  new mongoose.Schema({
    // Date du match (chaîne de caractères au format de date)
    matchDate: {
      type: String,
      default: Date.now, // Date par défaut est la date actuelle
      required: true // Champ obligatoire
    },
    // Ligue à laquelle le match appartient (référence à l'entité "League")
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true // Champ obligatoire
    },
    // Équipe à domicile (référence à l'entité "Team")
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true // Champ obligatoire
    },
    // Nombre de buts marqués par l'équipe à domicile (par défaut, 0)
    homeTeamGoals: {
      type: Number,
      default: 0,
      required: true // Champ obligatoire
    },
    // Équipe à l'extérieur (référence à l'entité "Team")
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true // Champ obligatoire
    },
    // Nombre de buts marqués par l'équipe à l'extérieur (par défaut, 0)
    awayTeamGoals: {
      type: Number,
      default: 0,
      required: true // Champ obligatoire
    },
    // Compétition à laquelle le match est associé (référence à l'entité "Competition")
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition"
    },
    // Identifiant de l'utilisateur associé au match (référence à l'entité "User")
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    // Joueur le plus précieux du match (référence à l'entité "Player", par défaut, null)
    mvp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      default: null
    },
    // Code court pour le match (chaîne de caractères)
    shortcode: {
      type: String
    },
    // Indicateur de suppression du match (par défaut, false)
    deleted: {
      type: Boolean,
      default: false
    },
    // Date de création du match (par défaut, date actuelle, non obligatoire)
    createdAt: {
      type: Date,
      default: Date.now,
      required: false
    }
  })
);

// Export du modèle "Fixture"
module.exports = Fixture;
