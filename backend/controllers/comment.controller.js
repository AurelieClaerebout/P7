// const db = require("../models");
// const Comment = db.comment;

// exports.createComment = (req, res) => {
//   Comment.create({
//     message: req.body.message,
//     image: req.body.image,
//     userId: req.body.userId,
//     postId: req.body.postId,
//   })
//     .then((comment) => {
//       res.status(200).json({ comment });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };

// exports.findAllComment = (req, res) => {
//   Comment.findAll()
//     .then((comments) => {
//       res.status(200).json({ comments });
//     })
//     .catch((err) =>
//       res.status(500).send({
//         message: err.message,
//       })
//     );
// };

// exports.findCommentPost = (req, res) => {
//   Comment.findAll(
//     { where: { postId: req.params.postId } }
//     // { order: [["createdAt", "DESC"]] }
//   )
//     .then((comments) => {
//       res.status(200).json({ comments });
//     })
//     .catch((err) => {
//       res.status(500).send(`${err}`);
//     });
// };

// exports.findOneComment = (req, res) => {
//   Comment.findByPk(req.params.id)
//     .then((comment) => {
//       res.status(200).json({ comment });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           "Erreur lors de la récupération du commentaire avec l'id=" +
//           req.params.id,
//       });
//     });
// };
// exports.modifyComment = (req, res) => {
//   const id = req.params.id;
//   Comment.update(req.body, {
//     where: { id: id },
//   })
//     .then((comment) => {
//       if (comment == 1) {
//         res.send({
//           message: "Commentaire mis à jour.",
//         });
//       } else {
//         res.send({
//           message: `Impossible de mettre à jour le commentaire avec  l'id=${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Erreur lors de la mise à jour du commentaire avec l'id=" + id,
//       });
//     });
// };

// exports.deleteComment = (req, res) => {
//   const id = req.params.id;
//   Comment.destroy({
//     where: { id: id },
//   })
//     .then((comment) => {
//       if (comment == 1) {
//         res.send({
//           message: "Le commentaire à été supprimé avec succès!",
//         });
//       } else {
//         res.send({
//           message: `Le commentaire avec l'id ${id} n'existe pas.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Impossible de supprimer le commentaire avec l'id " + id,
//       });
//     });
// };
