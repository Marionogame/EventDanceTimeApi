'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Qualifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skill: {
        type: Sequelize.INTEGER
      },
      coordination: {
        type: Sequelize.DECIMAL
      },
      scenography: {
        type: Sequelize.DECIMAL
      },
      choreography: {
        type: Sequelize.DECIMAL
      },
      creativity: {
        type: Sequelize.DECIMAL
      },
      id_group: {
        type: Sequelize.INTEGER
      },
      id_judge: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Qualifications');
  }
};