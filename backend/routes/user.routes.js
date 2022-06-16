const express = require("express");
const router = express.Router();

const authJwt = require("../middleware/authJwt");
const vld = require("../middleware/validator");
const userCtrl = require("../controllers/user.controller");
const multer = require("../middleware/multer-config");
const authorization = require("../middleware/authorization-user");

router.post("/register", vld.validatorEmail, vld.validatorpwd, userCtrl.signup);
router.post("/login", vld.limiter, userCtrl.signin);

// user.controller
router.get("/", authJwt, userCtrl.findAllUsers);
router.get("/:id", authJwt, userCtrl.findOneUser);
router.put("/:id", authJwt, authorization, multer, userCtrl.modifyUser);
router.delete("/:id", authJwt, authorization, userCtrl.deleteUser);

module.exports = router;
