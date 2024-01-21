const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const Competition = db.competition;

/* Ajouter un nouveau concours */
exports.createCompetition = async (req, resp, next) => {
  try {
    // Création multiple
    if (req.body && Array.isArray(req.body)) {
      let insertedCompetitions = [];
      for (let i = 0; i < req.body.length; i++) {
        if (req.body[i]["competitionName"]) {
          const competitionData = new Competition({
            competitionName: req.body[i]["competitionName"],
            organiser: req.body[i]["organiser"],
            shortCode: req.body[i]["shortCode"],
            competitionLogo: req.body[i]["competitionLogo"],
            competitionSettings: req.body[i]["competitionSettings"],
            competitionSeason: req.body[i]["competitionSeason"],
            competitionCountry: req.body[i]["competitionCountry"],
            competitionDescription: req.body[i]["competitionDescription"],
            competitionYear: req.body[i]["competitionYear"],
            competitionStart: req.body[i]["competitionStart"],
            competitionEnd: req.body[i]["competitionEnd"],
            user_id: ObjectId(req.body[i].user["createdBy"]),
            createdAt: new Date()
          });
          const savedCompetition = await competitionData.save();
          insertedCompetitions.push(savedCompetition);
        }
      }
      return resp.status(200).json(insertedCompetitions);
    } else if (req.body["competitionName"]) {
      const competitionData = new Competition({
        competitionName: req.body["competitionName"],
        organiser: req.body["organiser"],
        shortCode: req.body["shortCode"],
        competitionLogo: req.body["competitionLogo"],
        competitionSettings: req.body["competitionSettings"],
        competitionSeason: req.body["competitionSeason"],
        competitionDescription: req.body["competitionDescription"],
        competitionCountry: req.body["competitionCountry"],
        competitionYear: req.body["competitionYear"],
        competitionStart: req.body["competitionStart"],
        competitionEnd: req.body["competitionEnd"],
        user_id: ObjectId(req.body.user["createdBy"]),
        createdAt: new Date()
      });
      await competitionData.save();
      return resp
        .status(200)
        .json({ message: "La compétition a été créée avec succès !" });
    }
  } catch (error) {
    return resp
      .status(400)
      .json({ message: "Échec de la création de la compétition !" + error });
  }
};

/* Obtenir la liste de toutes les compétitions */
exports.getAllCompetitions = async (req, resp, next) => {
  try {
    const competition = await Competition.find({})
      .populate(["organiser", "user_id"])
      .exec();
    resp
      .status(200)
      .json(
        competition.length > 0
          ? competition
          : { message: "Aucune compétition trouvée" }
      );
  } catch (error) {
    next(error);
  }
};

exports.forShortCode = async (req, resp, next) => {
  try {
    const competition = await Competition.find({ _id: req.params.id }).exec();
    resp.status(200).json(competition);
  } catch (error) {
    next(error);
  }
};

/* Obtenir la compétition en fonction de l'identifiant */
exports.getCompetitionById = async (req, resp, next) => {
  try {
    const competition = await Competition.find({
      _id: ObjectId(req.params.id)
    });
    resp.status(200).json(competition);
  } catch (error) {
    next(error);
  }
};

exports.getCompetitionByName = async (req, resp, next) => {
  try {
    const competition = await Competition.find({
      competitionName: req.params.name
    });
    return resp
      .status(200)
      .json(competition ? competition : { message: "Aucune compétition trouvée" });
  } catch (error) {
    next(error);
  }
};

exports.getCompetitionByShortCode = async (req, resp, next) => {
  try {
    const competition = await Competition.find({
      shortCode: req.params.shortcode
    });
    return resp
      .status(200)
      .json(competition ? competition : { message: "Aucune compétition trouvée" });
  } catch (error) {
    next(error);
  }
};

/* Modifier une compétition existante en fonction de l'identifiant */
exports.updateCompetition = async (req, resp, next) => {
  try {
    if (req.params && req.params.id) {
      let fetchCompetition = await Competition.find({
        _id: ObjectId(req.params.id)
      });

      if (!fetchCompetition)
        return resp.status(404).json({ msg: "Enregistrement de la compétition introuvable" });

      fetchCompetition = {
        ...fetchCompetition._doc,
        ...req.body
      };

      const updatedCompetition = await Competition.findByIdAndUpdate(
        req.params.id,
        fetchCompetition,
        { new: true }
      );

      resp.status(200).json(updatedCompetition);
    } else {
      resp
        .status(200)
        .json({ message: "L'identifiant de la compétition n'est pas valide ou introuvable" });
    }
  } catch (error) {
    next(error);
  }
};

/* Supprimer la compétition en fonction de l'identifiant */
exports.deleteCompetition = async (req, resp, next) => {
  try {
    const competition = await Competition.findByIdAndDelete({
      _id: ObjectId(req.params.id)
    });
    resp.status(200).json({
      message: `La compétition a été supprimée avec succès ! ${competition.competitionName}`
    });
  } catch (error) {
    next(error);
  }
};

/* Supprimer toutes les compétitions */
exports.deleteAllCompetitions = async (req, resp, next) => {
  try {
    const competition = await Competition.deleteMany({});
    console.log(competition, "::: enregistrements supprimés");
    resp
      .status(200)
      .json({ message: `Tous les enregistrements de compétition ont été supprimés !` });
  } catch (error) {
    next(error);
  }
};
