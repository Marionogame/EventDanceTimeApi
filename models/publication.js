("use strict");
module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define(
    "publication",
    {
      image: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      Text: DataTypes.STRING,
      title: DataTypes.STRING,
      subTitle: DataTypes.STRING,
      like: DataTypes.INTEGER,
    },
    {}
  );
  Publication.associate = function (models) {
    // associations can be defined here
  };
  return Publication;
};
