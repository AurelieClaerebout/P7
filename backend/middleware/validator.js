const validator = require("validator");
const pwdValidator = require("password-validator");
const rateLimit = require("express-rate-limit");

exports.validatorEmail = (req, res, next) => {
  const { email } = req.body;

  if (validator.isEmail(email)) {
    next();
  } else {
    return res.status(400).json({ message: "Votre email est invalide" });
  }
};

const pwdSchema = new pwdValidator();

pwdSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .has()
  .symbols()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

exports.validatorpwd = (req, res, next) => {
  if (pwdSchema.validate(req.body.password)) {
    next();
  } else {
    res.status(400).json({
      message:
        "Votre mot de passe n'est pas assez fort(minimum 8 caractères dont 1 majuscule et 2 chiffres et 1 caractère spécial)",
    });
  }
};

exports.limiter = rateLimit({
  windowMs: 10 * 30 * 1000,
  max: 10,
  message: `Attention ! Trop de tentatives de connexion `,
});
