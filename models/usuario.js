'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    nombre_usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    edad: DataTypes.DATE,
    genero: DataTypes.CHAR,
    numero: DataTypes.INTEGER,
    correo: DataTypes.STRING,
    redes1: DataTypes.STRING,
    redes2: DataTypes.STRING,
    redes3: DataTypes.STRING,
    coleccion: DataTypes.STRING,
    imagen_perfil: DataTypes.STRING
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
  };
  return Usuario;
};