'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.DECIMAL
      },
      estado_de_venta: {
        type: Sequelize.CHAR
      },
      fecha_creacion: {
        type: Sequelize.DATE
      },
      medida_alto: {
        type: Sequelize.DECIMAL
      },
      medida_ancho: {
        type: Sequelize.DECIMAL
      },
      id_usuario: {
        type: Sequelize.INTEGER
      },
      imagen: {
        type: Sequelize.STRING
      },
      estilo: {
        type: Sequelize.STRING
      },
      tecnica: {
        type: Sequelize.STRING
      },
      soporte: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Productos');
  }
};