"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameEvent: {
        type: Sequelize.STRING,
      },
      id_user: {
        type: Sequelize.INTEGER,
      },
      finishTime: {
        type: Sequelize.DATE,
      },
      beginTime: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      eventCode: {
        type: Sequelize.STRING,
      },
      activeEvent: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
