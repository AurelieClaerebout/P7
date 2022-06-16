const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controller");
const authJwt = require("../middleware/authJwt");
const multer = require("../middleware/multer-config");
const authorization = require("../middleware/authorization-post");

router.post("/", authJwt, multer, postCtrl.createPost);

router.get("/", authJwt, postCtrl.findAllPost);
router.get("/:id", authJwt, postCtrl.findOnePost);
router.put("/:id", authJwt, authorization, multer, postCtrl.modifyPost);
router.delete("/:id", authJwt, authorization, postCtrl.deletePost);

router.post("/:id/like", authJwt, postCtrl.likePost);

module.exports = router;
