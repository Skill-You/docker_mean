// Ce fichier est responsable de la gestion des opérations CRUD pour les académies de football.
// Il utilise MongoDB comme base de données et suit les meilleures pratiques du développement MEAN.

const ObjectId = require("mongodb").ObjectId; // Importe ObjectId de MongoDB
const db = require("../models"); // Importe les modèles de la base de données
const Academy = db.academy; // Utilise le modèle Academy
const Team = db.team; // Utilise le modèle Team

// Cette fonction permet de créer une ou plusieurs académies.
exports.createAcademy = async (req, resp, next) => {
  try {
    if (req.body && Array.isArray(req.body)) { // Si les données sont un tableau
      let insertedAcademies = [];
      for (let i = 0; i < req.body.length; i++) {
        const isValidated =
          req.body[i]["Academy Name"] && req.body[i]["Academy Name"].length > 0;
        if (isValidated) {
          let academy = await Academy.findOne({
            academyName: req.body[i]["Academy Name"]
          });
          if (!academy) {
            const academyData = new Academy({
              academyName: req.body[i]["Academy Name"],
              logo: req.body[i]["Logo"],
              color: req.body[i]["Color"],
              coach: [ObjectId(req.body[i].user["createdBy"])],
              admin: ObjectId(req.body[i].user["admin"]),
              shortcode: req.body[i]["Short Code"],
              competition: ObjectId(req.body[i]["competition"]),
              createdAt: new Date()
            });
            insertedAcademies.push(req.body[i]);
            await academyData.save();
          }
        }
      }
      resp.status(200).json(insertedAcademies);
    } else if (req.body && req.body["Academy Name"]) { // Si les données sont un objet unique
      const isValidated =
        req.body["Academy Name"] && req.body["Academy Name"].length > 0;
      if (isValidated) {
        let academy = await Academy.findOne({
          academyName: req.body["Academy Name"]
        });
        if (!academy) {
          const academyData = new Academy({
            academyName: req.body["Academy Name"],
            logo: req.body["Logo"],
            color: req.body["Color"],
            shortcode: req.body["Short Code"],
            coach: [ObjectId(req.body.user["createdBy"])],
            admin: ObjectId(req.body.user["admin"]),
            competition: ObjectId(req.body["competition"]),
            createdAt: new Date()
          });

          const savedAcademy = await academyData.save();
          resp.status(200).json(savedAcademy);
        } else {
          resp.status(200).json({ message: "Academy already exists" });
        }
      } else {
        resp.status(200).json({ message: "Name is not valid" });
      }
    } else {
      resp.status(200).json({ message: "Malformed data provided" });
    }
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet d'obtenir une académie par son nom.
exports.getAcademyByName = async (req, resp, next) => {
  try {
    if (req.body && req.body.name) {
      const academy = await Academy.findOne({ academyName: req.body.name })
        .populate("coach")
        .exec();
      resp
        .status(200)
        .json(academy ? academy : { message: "No academy found" });
    } else {
      resp.status(200).json({ message: "Academy name is required to found" });
    }
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet d'obtenir une académie par son shortcode.
exports.forShortCode = async (req, resp, next) => {
  try {
    if (req.params && req.params.shortcode) {
      const academy = await Academy.find({ shortcode: req.params.shortcode })
        .populate(["coach", "competition"])
        .exec();
      resp.status(200).json(academy);
    } else {
      resp.status(200).json({ message: "shortcode is required!" });
    }
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet d'obtenir des académies par leur compétition.
exports.forCompetition = async (req, resp, next) => {
  try {
    if (req.params && req.params.id) {
      const academy = await Academy.find({
        competition: ObjectId(req.params.competition)
      })
        .populate(["coach", "competition"])
        .exec();
      resp.status(200).json(academy);
    } else {
      resp.status(200).json({ message: "Academy id is required to found" });
    }
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet d'obtenir toutes les académies.
exports.getAllAcademys = async (req, resp, next) => {
  try {
    const academies = await Academy.find()
      .populate(["coach", "competition"])
      .exec();
    resp
      .status(200)
      .json(academies.length > 0 ? academies : { message: "No academy found" });
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet d'obtenir une académie par son ID.
exports.getAcademyById = async (req, resp, next) => {
  try {
    if (req.params && req.params.id) {
      const academy = await Academy.findOne({ _id: ObjectId(req.params.id) })
        .populate(["coach", "competition"])
        .exec();
      resp.status(200).json(academy);
    } else {
      resp.status(200).json({ message: "Academy id is required to found" });
    }
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet d'obtenir une académie par l'ID de son coach.
exports.getAcademyByCoach = async (req, resp, next) => {
  try {
    if (req.params && req.params.id) {
      const academy = await Academy.findOne({ coach: ObjectId(req.params.id) })
        .populate(["coach", "competition"])
        .exec();
      if (academy) resp.status(200).json(academy);
    } else {
      resp.status(200).json({ message: "Academy id is required to found" });
    }
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet de mettre à jour le coach d'une académie.
exports.updateAcademyCoach = async (req, resp, next) => {
  try {
    const { id } = req.params;
    let fetchAcademy = await Academy.findOne({ _id: ObjectId(id) })
      .populate(["coach", "competition"])
      .exec();
    if (!fetchAcademy)
      return resp.status(404).json({ message: "Academy record not found" });

    // Met à jour l'académie en ajoutant le nouvel ID de coach.
    fetchAcademy = {
      ...fetchAcademy,
      coach: fetchAcademy.coach.push(ObjectId(req.body.coach))
    };

    const updatedAcademy = await Academy.findByIdAndUpdate(
      req.params.id,
      fetchAcademy,
      { new: true }
    );

    resp.status(200).json(updatedAcademy);
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet de mettre à jour le coach d'une académie.
exports.updateAcademyCoach = async (req, resp, next) => {
  try {
    const { id } = req.params;
    let fetchAcademy = await Academy.findOne({ _id: ObjectId(id) })
      .populate(["coach", "competition"])
      .exec();

    if (!fetchAcademy)
      return resp.status(404).json({ message: "Academy record not found" });

    // Vérifie si le coach existe déjà, le supprime s'il le fait, sinon l'ajoute.
    if (
      fetchAcademy.coach &&
      fetchAcademy.coach.includes(ObjectId(req.body.coach))
    ) {
      let fetchAcademy = await Academy.findOne({ _id: ObjectId(id) });
      fetchAcademy.coach = fetchAcademy.coach.filter(
        (ch) => ObjectId(ch) !== ObjectId(req.body.coach)
      );
    } else {
      fetchAcademy.coach.push(ObjectId(req.body.coach));
    }

    const updatedAcademy = await Academy.findByIdAndUpdate(
      req.params.id,
      fetchAcademy,
      { new: true }
    );

    resp.status(200).json(updatedAcademy);
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet de mettre à jour une académie par son ID.
exports.updateAcademy = async (req, resp, next) => {
  try {
    const { id } = req.params;
    let fetchAcademy = await Academy.findOne({ _id: ObjectId(id) })
      .populate("coach")
      .exec();

    if (!fetchAcademy)
      return resp.status(404).json({ message: "Academy record not found" });

    // Met à jour l'académie avec les données reçues.
    fetchAcademy = {
      ...fetchAcademy._doc,
      ...req.body
    };

    const updatedAcademy = await Academy.findByIdAndUpdate(
      req.params.id,
      fetchAcademy,
      { new: true }
    );

    resp.status(200).json(updatedAcademy);
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet de supprimer une académie par son ID.
exports.deleteAcademy = async (req, resp, next) => {
  try {
    if (req.params.id) {
      // Supprime toutes les équipes de l'académie
      const teams = await Team.deleteMany({
        academy_id: ObjectId(req.params.id)
      });
      const academy = await Academy.findByIdAndDelete({
        _id: ObjectId(req.params.id)
      });
      if (!academy) {
        resp.status(200).json({ message: `No academy record found!` });
      }
      resp.status(200).json({
        message: `Academy ${academy.academyName} with ${teams.deletedCount} teams was deleted!`
      });
    } else {
      resp.status(200).json({
        type: "error",
        message: "record not found"
      });
    }
  } catch (error) {
    next(error);
  }
};

// Cette fonction permet de supprimer toutes les académies.
exports.deleteAllAcademys = async (req, resp, next) => {
  try {
    const academy = await Academy.remove({});
    resp
      .status(200)
      .json({ message: `All academies records has been deleted!` });
  } catch (error) {
    next(error);
  }
};
