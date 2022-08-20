("use strict");
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "group",
    { name: DataTypes.STRING, category: DataTypes.STRING, id_event: DataTypes.INTEGER, email: DataTypes.STRING, phone: DataTypes.STRING },
    {}
  );
  Group.associate = function (models) {
    // associations can be defined here
  };
  return Group;
};
