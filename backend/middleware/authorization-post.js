const jwt = require("jsonwebtoken");
const db = require("../models");
const Post = db.post;
const User = db.user;

module.exports = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      User.findOne({ where: { id: req.userId } })
        .then((user) => {
          const token = req.headers.authorization.split(" ")[1];
          const decodedToken = jwt.verify(token, process.env.TOKEN);
          const userId = decodedToken.id;
          if (post.userId === userId || user.role === 1) {
            next();
          } else {
            return res.status(401).json({ error: "Requête non autorisée" });
          }
        })
        .catch((err) => res.status(401).json(`${err}`));
    })
    .catch((err) => res.status(401).json(`${err}`));
};
