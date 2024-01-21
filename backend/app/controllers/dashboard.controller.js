const db = require("../models");
const ObjectId = require("mongodb").ObjectId;
const Academy = db.academy;
const Team = db.team;
const Competition = db.competition;
const Fixture = db.fixture;
const League = db.league;
const Player = db.player;
const User = db.user;

// Fonction pour obtenir le contenu du tableau de bord
exports.getDashboardContents = async (req, resp, next) => {
  try {
    const { shortcode, role, competition, userId } = req;
    console.log(shortcode, role, competition, userId);
    let academies = [];
    let competitions = [];
    let fixtures = [];
    let leagues = [];
    let players = [];
    let teams = [];
    let data = {};
    // Si l'utilisateur a le rôle de "coach"
    if (role === "coach") {
      // Récupération de l'académie associée au coach
      academies = await Academy.findOne({
        coach: ObjectId(userId),
        shortcode: shortcode
      })
        .populate("coach")
        .exec();
      // Récupération des compétitions associées
      competitions = await Competition.find({
        _id: Array.isArray(competition)
          ? ObjectId(competition[0]._id)
          : ObjectId(competition._id),
        shortcode: shortcode
      })
        .populate(["organiser", "user_id"])
        .exec();
      // Récupération des ligues associées aux compétitions
      leagues = await League.find({
        competition: Array.isArray(competition)
          ? competition[0]._id
          : competition._id,
        shortcode: shortcode
      });
      // Récupération des joueurs associés à l'académie et à la compétition
      players = await Player.find({
        academy: ObjectId(academies._id),
        competition: Array.isArray(competition)
          ? competition[0]._id
          : competition._id,
        shortcode: shortcode
      })
        .populate("league")
        .populate("academy")
        .populate("team")
        .populate("user")
        .populate("competition")
        .sort({ createdAt: -1 })
        .exec();
      // Récupération des équipes associées à l'académie
      teams = await Team.find({
        academy_id: academies._id,
        shortcode: shortcode
      })
        .populate(["academy_id", "leagues", "user_id"])
        .exec();
      // Si des équipes existent, les mettre à jour avec le nombre de ligues
      if (teams) {
        teams = JSON.parse(JSON.stringify(teams));
        teams = teams.map((team) => {
          return { ...team, count: team.leagues.length };
        });
      }
      // Si l'utilisateur a le rôle "admin"
    } else if (role === "admin") {
      // Récupération des académies associées à l'administrateur
      academies = await Academy.find({
        user_id: ObjectId(userId),
        shortcode: shortcode
      })
        .populate(["coach", "competition"])
        .exec();
      // Récupération des compétitions organisées par l'administrateur
      competitions = await Competition.find({
        organiser: ObjectId(userId),
        shortcode: shortcode
      })
        .populate(["organiser", "user_id"])
        .exec();
      // Récupération des matchs (fixtures) associés à l'administrateur
      fixtures = await Fixture.find({ user_id: ObjectId(userId) }).populate([
        "league",
        "homeTeam",
        "awayTeam",
        "user_id",
        "competition"
      ]);
      // Récupération des ligues associées à l'administrateur
      leagues = await League.find({
        user_id: ObjectId(userId),
        shortcode: shortcode
      });
      // Récupération des joueurs
      players = await Player.find({
        shortcode: shortcode
      })
        .populate("league")
        .populate("academy")
        .populate("team")
        .populate("user")
        .populate("competition")
        .sort({ createdAt: -1 })
        .exec();
      // Récupération des équipes associées à l'administrateur
      teams = await Team.find({
        user_id: ObjectId(userId),
        shortcode: shortcode
      })
        .populate(["academy_id", "leagues", "user_id", "competition"])
        .exec();
      // Si des équipes existent, les mettre à jour avec le nombre de ligues
      if (teams) {
        teams = JSON.parse(JSON.stringify(teams));
        teams = teams.map((team) => {
          return { ...team, count: team.leagues.length };
        });
      }
      // Si l'utilisateur a le rôle "super admin"
    } else {
      // Récupération de toutes les académies
      academies = await Academy.find({}).populate(["coach"]).exec();
      // Récupération de toutes les compétitions
      competitions = await Competition.find({})
        .populate(["organiser", "user_id"])
        .exec();
      // Récupération de tous les matchs (fixtures)
      fixtures = await Fixture.find({}).populate([
        "league",
        "homeTeam",
        "awayTeam",
        "user_id",
        "competition"
      ]);
      // Récupération de toutes les ligues
      leagues = await League.find({});
      // Récupération de tous les joueurs
      players = await Player.find({})
        .populate("league")
        .populate("academy")
        .populate("team")
        .populate("user")
        .populate("competition")
        .sort({ createdAt: -1 })
        .exec();
      // Récupération de toutes les équipes
      teams = await Team.find({})
        .populate(["academy_id", "leagues", "user_id"])
        .exec();
      // Si des équipes existent, les mettre à jour avec le nombre de ligues
      if (teams) {
        teams = JSON.parse(JSON.stringify(teams));
        teams = teams.map((team) => {
          return { ...team, count: team.leagues.length };
        });
      }
    }
    // Si l'utilisateur a le rôle "referee"
    if (role === "referee") {
      data = {
        players,
        teams,
        academies: Array.isArray(academies) ? academies : [academies],
        competitions,
        fixtures,
        leagues
      };
    } else {
      data = {
        players,
        competitions,
        academies: Array.isArray(academies) ? academies : [academies],
        teams
      };
    }

    return resp.status(200).json({
      success: true,
      data: data,
      message: "Les données du tableau de bord ont été récupérées avec succès"
    });
  } catch (error) {
    console.log(error);
    return resp.status(404).json({
      success: false,
      message: "Échec de la récupération des données du tableau de bord"
    });
  }
};
