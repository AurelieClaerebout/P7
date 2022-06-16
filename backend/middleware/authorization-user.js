const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

module.exports = (req, res, next) => {
  User.findOne({ where: { id: req.userId } })
    .then((user) => {
      let token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.id;
      const id = req.params.id;
      if (id == userId || user.role === 1) {
        next();
      } else {
        return res.status(401).json({ err: "Requête non autorisée" });
      }
    })
    .catch((err) => res.status(400).json({ message: `${err}` }));
};
