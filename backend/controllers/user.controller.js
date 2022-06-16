const db = require("../models");
const { user: User } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.signup = (req, res) => {
  User.create({
    prenom: req.body.prenom,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => res.status(201).json({ message: "utilisateur créé !" }))
    .catch((err) => {
      res.status(500).json({ message: err.errors[0].message });
    });
};
// ===========================================================

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Password invalide!",
        });
      }
      res.status(200).json({
        id: user.id,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        token: jwt.sign({ id: user.id }, process.env.TOKEN),
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Trouver tout les utilisateurs de la BDD
exports.findAllUsers = (req, res) => {
  User.findAll({
    include: ["like"],
  })
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

// Trouver un utilisateur avec son Id
exports.findOneUser = (req, res) => {
  User.findByPk(
    req.params.id,
    {
      attributes: ["id", "prenom", "email", "role", "image", "bio"],
    },
    { include: ["like"] }
  )
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => res.status(400).json(`${err}`));
};

// Mettre à jour un utilisateur par l'id dans la requête
exports.modifyUser = (req, res) => {
  User.findOne({
    attributes: ["id", "prenom", "email", "bio", "image"],
    where: { id: req.params.id },
  })
    .then((user) => {
      if (req.file && user.image != null) {
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const userObject = {
            prenom: req.body.prenom,
            email: req.body.email,
            bio: req.body.bio,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          user
            .update({
              ...userObject,
            })
            .then(() =>
              res.status(200).json({ message: "Utilisateur modifié" })
            )
            .catch((err) => res.status(400).json({ message: err }));
        });
      } else if (req.file) {
        user
          .update({
            prenom: req.body.prenom,
            email: req.body.email,
            bio: req.body.bio,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          })
          .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
          .catch((err) => res.status(400).json({ message: err }));
      } else {
        user
          .update({
            prenom: req.body.prenom,
            email: req.body.email,
            bio: req.body.bio,
          })
          .then(() => res.status(200).json({ message: "Utilisateur modifié" }))
          .catch((err) => res.status(400).json({ message: err }));
      }
    })
    .catch((err) => res.status(400).json({ message: `${err}` }));
};

// Supprimer un utilisateur avec l'id  dans la requête
exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id, {
    attributes: ["id"],
  })
    .then((user) => {
      if (user.image) {
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          user
            .destroy({ where: { id: req.params.id } })
            .then(() =>
              res.status(200).json({ message: "Utilisateur supprimé" })
            )
            .catch((err) => res.status(400).json({ message: err }));
        });
      } else {
        user
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
          .catch((err) => res.status(400).json({ message: err }));
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "cet utilisateur n'existe pas" });
    });
};
