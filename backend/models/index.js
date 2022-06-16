const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model")(sequelize, Sequelize);
db.post = require("../models/post.model")(sequelize, Sequelize);
// db.comment = require("../models/comment.model")(sequelize, Sequelize);
db.like = require("../models/like.model")(sequelize, Sequelize);

// ========== Relation User/Post ==========
db.user.hasMany(db.post, { as: "post", onDelete: "cascade" });

db.post.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});

// ========== Relation Post/Comment ==========
// db.post.hasMany(db.comment, { as: "comment", onDelete: "cascade" });

// db.comment.belongsTo(db.post, {
//   foreignKey: "postId",
//   targetKey: "id",
// });

// ========== Relation User/Comment ==========
// db.user.hasMany(db.comment, { as: "comment", onDelete: "cascade" });

// ========== Relation Post/Like ==========
db.post.hasMany(db.like, { as: "like", onDelete: "cascade" });

db.like.belongsTo(db.post, {
  foreignKey: "postId",
  targetKey: "id",
});
// ========== Relation User/Like ==========
db.user.hasMany(db.like, { as: "like" });

// db.like.belongsTo(db.user, {
//   foreignKey: "userId",
//   targetKey: "id",
// });

module.exports = db;
