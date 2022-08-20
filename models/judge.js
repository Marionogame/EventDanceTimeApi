("use strict");
module.exports = (sequelize, DataTypes) => {
  const Judge = sequelize.define(
    "judge",
    {
      judgeCode: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      Id_event: DataTypes.INTEGER,
    },
    {}
  );
  Judge.associate = function (models) {
    // associations can be defined here
  };
  return Judge;
};
