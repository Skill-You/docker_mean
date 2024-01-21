const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const League = db.league;

/* Ajouter une nouvelle ligue */
exports.createLeague = async (req, resp, next) => {
  try {
    // Vérification si la requête contient un tableau de ligues
    if (req.body && Array.isArray(req.body)) {
      let insertedLeagues = [];
      for (let i = 0; i < req.body.length; i++) {
        const isValidated =
          req.body[i]["League Name"] && req.body[i]["League Name"].length > 0
            ? true
            : false;
        if (isValidated) {
          let league = await League.findOne({
            leagueName: req.body[i]["League Name"]
          });
          if (!league) {
            const leagueData = new League({
              leagueName: req.body[i]["League Name"],
              leagueAgeLimit: req.body[i]["Age Limit"],
              shortcode: req.body[i]["Short Code"],
              year: req.body[i]["Year"],
              user_id: ObjectId(req.body[i].user["createdBy"]),
              competition: ObjectId(req.body[i].competition),
              createdAt: new Date()
            });
            insertedLeagues.push(req.body[i]);
            await leagueData.save();
          }
        }
      }
      resp.status(200).json(insertedLeagues);
    } else if (req.body && req.body["League Name"]) {
      // Valider le nom de la ligue
      const isValidated =
        req.body["League Name"] && req.body["League Name"].length > 0;
      if (isValidated) {
        // Vérifier si la ligue existe déjà dans la base de données
        let league = await League.findOne({
          shortcode: req.body["Short Code"],
          user_id: ObjectId(req.body.user["createdBy"]),
          leagueName: req.body["League Name"]
        });
        if (!league) {
          const leagueData = new League({
            leagueName: req.body["League Name"],
            leagueAgeLimit: req.body["Age Limit"],
            shortcode: req.body["Short Code"],
            year: req.body["Year"],
            user_id: ObjectId(req.body.user["createdBy"]),
            competition: ObjectId(req.body.competition),
            createdAt: new Date()
          });

          const savedLeague = await leagueData.save();
          resp.status(200).json(savedLeague);
        } else {
          resp
            .status(200)
            .json({ type: "error", message: "La ligue existe déjà" });
        }
      } else {
        resp.status(200).json({ type: "error", message: "Le nom n'est pas valide" });
      }
    } else {
      resp
        .status(200)
        .json({ type: "error", message: "Données malformées fournies" });
    }
  } catch (error) {
    next(error);
  }
};

/* Obtenir toutes les ligues */
exports.getLeagues = async (req, resp, next) => {
  try {
    const leagues = await League.find({})
      .populate(["user_id", "competition"])
      .exec();
    return resp.status(200).json(leagues);
  } catch (error) {
    next(error);
  }
};

/* Obtenir une ligue en fonction de son ID */
exports.getLeagueById = async (req, resp, next) => {
  try {
    const league = await League.find({ _id: ObjectId(req.params.id) })
      .populate(["competition", "user_id"])
      .exec();
    resp.status(200).json(league ? league : { message: "Aucune ligue trouvée" });
  } catch (error) {
    next(error);
  }
};

exports.forShortCode = async (req, resp, next) => {
  try {
    const league = await League.find({ shortcode: req.params.shortcode })
      .populate(["user_id", "competition"])
      .exec();
    resp.status(200).json(league ? league : { message: "Aucune ligue trouvée" });
  } catch (error) {
    next(error);
  }
};

exports.forCompetition = async (req, resp, next) => {
  try {
    const league = await League.find({
      competition: ObjectId(req.params.competition)
    })
      .populate(["user_id", "competition"])
      .exec();
    resp.status(200).json(league ? league : { message: "Aucune ligue trouvée" });
  } catch (error) {
    next(error);
  }
};

/* Modifier une ligue existante en fonction de son ID */
exports.updateLeague = async (req, resp, next) => {
  try {
    const { id } = req.params;
    let fetchLeague = await League.find({ _id: ObjectId(id) });

    if (!fetchLeague)
      return resp.status(404).json({ message: "Enregistrement de la ligue introuvable" });
    fetchLeague = {
      ...fetchLeague._doc,
      ...req.body
    };

    const updatedLeague = await League.findByIdAndUpdate(
      req.params.id,
      fetchLeague,
      { new: true }
    );

    resp.status(200).json(updatedLeague);
  } catch (error) {
    next(error);
  }
};

/* Supprimer une ligue en fonction de son ID */
exports.deleteLeague = async (req, resp, next) => {
  try {
    const league = await League.findByIdAndDelete({
      _id: ObjectId(req.params.id)
    });
    if (!league) {
      resp
        .status(200)
        .json({ message: `Enregistrement de la ligue ${league.leagueName} supprimé !` });
    }
    resp.status(200).json({
      message: `Enregistrement de la ligue ${league.leagueName} supprimé !`
    });
  } catch (error) {
    next(error);
  }
};

/* Supprimer toutes les ligues */
exports.deleteAllLeagues = async (req, resp, next) => {
  try {
    const lg = await League.remove({});
    resp.status(200).json({ message: "Toutes les ligues ont été supprimées !" });
  } catch (error) {
    next(error);
  }
};
