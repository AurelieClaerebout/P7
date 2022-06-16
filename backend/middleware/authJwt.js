const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Pas de Token!" });
  } else {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: " Token invalide!" });
      }
      req.userId = decoded.id;

      next();
    });
  }
};
