const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const Team = db.team;

/* Ajouter une nouvelle équipe */
exports.createTeam = async (req, resp, next) => {
  try {
    // Création multiple
    if (req.body && Array.isArray(req.body)) {
      let insertedTeams = [];
      for (let i = 0; i < req.body.length; i++) {
        const isValidated =
          req.body[i]["Team Name"] && req.body[i]["Team Name"].length > 0;
        if (isValidated) {
          let team = await Team.findOne({ teamName: req.body["Team Name"] });
          if (!team) {
            const teamData = new Team({
              teamName: req.body[i]["Team Name"],
              academy_id: req.body[i]["Academy Id"],
              leagues: [...req.body[i].leagues],
              user_id: ObjectId(req.body[i].user["createdBy"]),
              shortcode: req.body[i]["shortCode"],
              competition: ObjectId(req.body[i]["competition"]),
              createdAt: new Date()
            });
            insertedTeams.push(req.body[i]);
            await teamData.save();
          }
        }
      }
      resp.status(200).json(insertedTeams);
    } else if (req.body && req.body["Team Name"]) {
      // Valider le nom de l'équipe
      const isValidated =
        req.body["Team Name"] && req.body["Team Name"].length > 0;
      if (isValidated) {
        // Vérifier si le même identifiant existe déjà dans la base de données
        const team = await Team.findOne({ teamName: req.body["Team Name"] });

        if (!team) {
          const teamData = new Team({
            teamName: req.body["Team Name"],
            academy_id: req.body["Academy Id"],
            leagues: [...req.body.leagues],
            user_id: ObjectId(req.body.user["createdBy"]),
            shortcode: req.body["shortCode"],
            competition: ObjectId(req.body["competition"]),
            createdAt: new Date()
          });

          const savedPlayer = await teamData.save();
          resp.status(200).json(savedPlayer);
        } else {
          resp.status(200).json({ message: "L'équipe existe déjà" });
        }
      } else {
        resp.status(200).json({ message: "Le nom de l'équipe n'est pas valide" });
      }
    } else {
      resp.status(200).json({ message: "Données malformées fournies" });
    }
  } catch (error) {
    next(error);
  }
};

/* Obtenir toutes les équipes */
exports.getAllTeams = async (req, resp, next) => {
  try {
    const teams = await Team.find()
      .populate(["academy_id", "leagues", "user_id"])
      .exec();
    resp
      .status(200)
      .json(teams.length > 0 ? teams : { message: "Aucune équipe trouvée" });
  } catch (error) {
    next(error);
  }
};

/* Obtenir une équipe en fonction de son identifiant */
exports.getTeamById = async (req, resp, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const team = await Team.findOne({ _id: ObjectId(id) })
        .populate(["academy_id", "leagues", "user_id"])
        .exec();
      resp.status(200).json(team ? team : { message: "Aucune équipe trouvée" });
    } else {
      resp.status(200).json({ message: "Identifiant malformé fourni" });
    }
  } catch (error) {
    next(error);
  }
};

exports.forShortCode = async (req, resp, next) => {
  try {
    const { shortcode } = req.params;
    if (shortcode) {
      const team = await Team.find({ shortcode: req.params.shortcode })
        .populate(["academy_id", "leagues", "user_id"])
        .exec();
      resp.status(200).json(team ? team : { message: "Aucune équipe trouvée" });
    } else {
      resp.status(200).json({ message: "Identifiant malformé fourni" });
    }
  } catch (error) {
    next(error);
  }
};
exports.forCompetition = async (req, resp, next) => {
  try {
    const { competition } = req.params;
    if (competition) {
      const team = await Team.find({
        competition: ObjectId(req.params.competition)
      })
        .populate(["academy_id", "leagues", "user_id"])
        .exec();
      resp.status(200).json(team ? team : { message: "Aucune équipe trouvée" });
    } else {
      resp.status(200).json({ message: "Identifiant malformé fourni" });
    }
  } catch (error) {
    next(error);
  }
};
exports.getTeamByAcademyId = async (req, resp, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const team = await Team.find({ academy_id: ObjectId(req.params.id) })
        .populate(["academy_id", "leagues", "user_id"])
        .exec();
      resp
        .status(200)
        .json(team.length > 0 ? team : { message: "Aucune équipe trouvée" });
    } else {
      resp.status(200).json({ message: "Identifiant malformé fourni" });
    }
  } catch (error) {
    next(error);
  }
};

/* Modifier une équipe existante en fonction de son identifiant */
exports.updateTeam = async (req, resp, next) => {
  try {
    const { id } = req.params;
    if (id) {
      let fetchTeam = await Team.find({ _id: ObjectId(id) })
        .populate(["academy_id", "leagues", "user_id"])
        .exec();

      if (!fetchTeam)
        return resp.status(404).json({ message: "Enregistrement de l'équipe introuvable" });
      fetchTeam = {
        ...fetchTeam._doc,
        ...req.body
      };

      const updatedTeam = await Team.findByIdAndUpdate(
        req.params.id,
        fetchTeam,
        { new: true }
      );

      resp.status(200).json(updatedTeam).status(200);
    } else {
      resp.status(200).json({ message: "Identifiant malformé fourni" });
    }
  } catch (error) {
    next(error);
  }
};

/* Supprimer une équipe en fonction de son identifiant */
exports.deleteTeam = async (req, resp, next) => {
  try {
    if (req.params && req.params.id) {
      const team = await Team.findByIdAndDelete({
        _id: ObjectId(req.params.id)
      });
      if (!team) {
        resp.status(200).send(`Enregistrement de l'équipe introuvable!`);
      }
      resp
        .status(200)
        .send({ message: `Enregistrement de l'équipe ${team.teamName} supprimé!` });
    } else {
      resp.status(200).json({ message: "Identifiant malformé fourni" });
    }
  } catch (error) {
    next(error);
  }
};

/* Supprimer toutes les équipes */
exports.deleteAllTeams = async (req, resp, next) => {
  try {
    const team = await Team.remove({});
    resp.status(200).json({ message: `Toutes les équipes ont été supprimées!` });
  } catch (error) {
    next(error);
  }
};
