'use strict';
module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define('Productos', {
    nombre: DataTypes.STRING,
    categoria: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    estado_de_venta: DataTypes.CHAR,
    fecha_creacion: DataTypes.DATE,
    medida_alto: DataTypes.DECIMAL,
    medida_ancho: DataTypes.DECIMAL,
    id_usuario: DataTypes.INTEGER,
    imagen: DataTypes.STRING,
    estilo: DataTypes.STRING,
    tecnica: DataTypes.STRING,
    soporte: DataTypes.STRING
  }, {});
  Productos.associate = function(models) {
    // associations can be defined here
  };
  return Productos;
};