"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      institution: DataTypes.STRING,
      password: DataTypes.STRING,
      occupation: DataTypes.STRING,
      description: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
