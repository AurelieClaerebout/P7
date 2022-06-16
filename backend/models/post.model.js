module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    message: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
      default: 0,
    },
    // like: {
    //   type: Sequelize.INTEGER,
    //   defaultValue: 0,
    // },
  });
  return Post;
};
