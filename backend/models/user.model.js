module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    prenom: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    role: {
      defaultValue: 0,
      type: Sequelize.INTEGER,
    },
  });
  return User;
};
