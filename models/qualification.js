"use strict";
module.exports = (sequelize, DataTypes) => {
  const Qualification = sequelize.define(
    "qualification",
    {
      skill: DataTypes.INTEGER,
      coordination: DataTypes.DECIMAL,
      scenography: DataTypes.DECIMAL,
      choreography: DataTypes.DECIMAL,
      creativity: DataTypes.DECIMAL,
      id_group: DataTypes.INTEGER,
      id_judge: DataTypes.INTEGER,
    },
    {}
  );
  Qualification.associate = function (models) {
    // associations can be defined here
  };
  return Qualification;
};
