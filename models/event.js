("use strict");
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      nameEvent: DataTypes.STRING,
      id_user: DataTypes.INTEGER,
      finishTime: DataTypes.DATE,
      beginTime: DataTypes.DATE,
      description: DataTypes.STRING,
      phone: DataTypes.STRING,
      eventCode: DataTypes.STRING,
      activeEvent: DataTypes.BOOLEAN,
    },
    {}
  );
  Event.associate = function (models) {
    // associations can be defined here
  };
  return Event;
};
