'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      nombre_usuario: {
        type: Sequelize.STRING
      },
      contrasena: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.DATE
      },
      genero: {
        type: Sequelize.CHAR
      },
      numero: {
        type: Sequelize.INTEGER
      },
      correo: {
        type: Sequelize.STRING
      },
      redes1: {
        type: Sequelize.STRING
      },
      redes2: {
        type: Sequelize.STRING
      },
      redes3: {
        type: Sequelize.STRING
      },
      coleccion: {
        type: Sequelize.STRING
      },
      imagen_perfil: {
        type: Sequelize.STRING
      },
      id_usuario: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logins');
  }
};