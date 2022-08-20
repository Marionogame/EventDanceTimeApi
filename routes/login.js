const Models = require("../models/index");
const Joi = require("joi");

const loginsHandler = async (request, h) => {
  try {
    const logins = await Models.Login.findAll({});
    return { data: logins };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createLoginHandler = async (request, h) => {
  try {
    const { nombre, apellido, nombre_usuario, contrasena, edad, genero, numero, correo, redes1, redes2, redes3, coleccion, imagen_perfil, id_usuario } =
      request.payload;
    const login = await Models.Login.create({
      nombre: nombre,
      apellido: apellido,
      nombre_usuario: nombre_usuario,
      contrasena: contrasena,
      edad: edad,
      genero: genero,
      numero: numero,
      correo: correo,
      redes1: redes1,
      redes2: redes2,
      redes3: redes3,
      coleccion: coleccion,
      imagen_perfil: imagen_perfil,
      id_usuario: id_usuario,
    });
    return {
      data: login,
      message: "New login has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deleteLoginHandler = async (request, h) => {
  try {
    const login_id = request.params.id;
    await Models.Login.destroy({
      where: {
        id: login_id,
      },
    });
    return { message: "Login has been deleted." };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

module.exports = [
  { method: "GET", path: "/login", handler: loginsHandler },
  {
    method: "POST",
    path: "/login",
    config: {
      validate: {
        payload: Joi.object({
          nombre: Joi.string().min(3).max(25).required(),
          apellido: Joi.string().min(3).max(25).required(),
          nombre_usuario: Joi.string().max(25).min(5).required(),
          contrasena: Joi.string().min(6).max(20).required(),
          edad: Joi.date().required(),
          genero: Joi.string().max(1).required(),
          numero: Joi.number().integer().min(1000000000).max(9999999999),
          correo: Joi.string().min(3).required(),
          redes1: Joi.string(),
          redes2: Joi.string(),
          redes3: Joi.string(),
          coleccion: Joi.string(),
          imagen_perfil: Joi.string(),
          id_usuario: Joi.number().required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createLoginHandler,
  },

  { method: "DELETE", path: "/login/{id}", handler: deleteLoginHandler },
];
