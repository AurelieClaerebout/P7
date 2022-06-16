const db = require("../models");
const Post = db.post;
const Like = db.like;
const fs = require("fs");

// Créer un post
exports.createPost = (req, res, next) => {
  Post.create({
    message: req.body.message,
    image: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
    userId: req.body.userId,
  }).then((post) => {
    post
      .save()
      .then(() =>
        res.status(201).json({
          message: req.body.message,
          image: req.file
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : null,
          userId: req.body.userId,
        })
      )
      .catch((error) => res.status(400).json({ error }));
  });
};

// Récupérez tous les posts
exports.findAllPost = (req, res) => {
  Post.findAll({
    include: ["like"],
  })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

// Trouver un post
exports.findOnePost = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id, { include: ["like"] })
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({
          message: `Impossible de trouver l'article avec l'id ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Erreur lors de la récupération de l'article avec l'id=" + id,
      });
    });
};

// Modifier un post en vérifiant si il y a changement d'image
exports.modifyPost = (req, res) => {
  const id = req.params.id;
  Post.findOne({
    where: { id: id },
  })
    .then((post) => {
      if (req.file && post.image != null) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const postObject = {
            message: req.body.message,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          post
            .update({ ...postObject })
            .then(() => {
              res.json({
                message: req.body.message,
                image: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message:
                  "Erreur lors de la mise à jour du post avec l'id=" + id,
              });
            });
        });
      } else if (req.file) {
        post
          .update({
            message: req.body.message,
            image: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          })
          .then(() => {
            res.json({
              message: req.body.message,
              image: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Erreur lors de la mise à jour du post avec l'id=" + id,
            });
          });
      } else {
        post
          .update({
            message: req.body.message,
          })
          .then(() => {
            res.json({
              message: req.body.message,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Erreur lors de la mise à jour du post avec l'id=" + id,
            });
          });
      }
    })
    .catch((err) => res.status(400).json({ message: `${err}` }));
};

// Supprimer un article par l'id dans la requête
exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.findOne({
    where: { id: id },
  })
    .then((post) => {
      if (post.image) {
        const filename = post.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          post
            .destroy({
              where: { id: id },
            })
            .then(() => {
              res.status(200).json({
                message: "Le post à été supprimé avec succès!",
              });
            })
            .catch(() => {
              res.status(500).json({
                message: "Impossible de supprimer le post avec l'id " + id,
              });
            });
        });
      } else {
        post
          .destroy({
            where: { id: id },
          })
          .then(() => {
            res.json({
              message: `Le post à été supprimé avec succès!`,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Impossible de supprimer le post avec l'id " + id,
            });
          });
      }
    })
    .catch(() => res.status(400).json({ message: "Ce post n'existe pas" }));
};

exports.likePost = (req, res) => {
  Like.findOne({
    where: { postId: req.params.id, userId: req.body.userId },
  })
    .then((like) => {
      if (like == null) {
        Like.create({
          like: req.body.like,
          postId: req.params.id,
          userId: req.body.userId,
        })
          .then(() => res.status(200).json({ message: "Post Liké !" }))
          .catch((err) => res.status(400).json(`${err}`));
      } else {
        like
          .destroy()
          .then(() => res.status(200).json({ message: "Like supprimé ! " }))
          .catch((err) => res.status(400).json(`${err}`));
      }
    })
    .catch((err) => res.status(400).json({ message: err }));
};
