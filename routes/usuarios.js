const Models = require("../models/index");
const path = require("path");

const Joi = require("joi");
const fs = require("fs");
const usuariosHandler = async (request, h) => {
  try {
    const usuarios = await Models.Usuario.findAll({});
    return { data: usuarios };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createUsuarioHandler = async (request, h) => {
  try {
    const { nombre, apellido, nombre_usuario, contrasena, edad, genero, numero, correo, redes1, redes2, redes3, coleccion, imagen_perfil } = request.payload;
    const usuario = await Models.Usuario.create({
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
    });
    return {
      data: usuario,
      message: "New usuario has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const updateUsuarioHandler = async (request, h) => {
  try {
    const usuario_id = request.params.id;
    const { nombre, apellido, nombre_usuario, contrasena, genero, edad, numero, correo, redes1, redes2, redes3, coleccion, imagen_perfil } = request.payload;
    const usuario = await Models.Usuario.update(
      {
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
      },
      {
        where: {
          id: usuario_id,
        },
      }
    );
    return {
      message: "Usuario has been updated.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deleteUsuarioHandler = async (request, h) => {
  try {
    const usuario_id = request.params.id;
    await Models.Usuario.destroy({
      where: {
        id: usuario_id,
      },
    });
    return { message: "Usuario has been deleted." };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};
const deleteImageUsuarioHandler = async (request, h) => {
  try {
    const imagen_name = request.params.id;
    const path = __dirname + `/../almacen_imagenes/perfil/${imagen_name}`;

    fs.unlinkSync(path);
    //file removed
    return { message: "image has been deleted." };
  } catch (err) {
    return h
      .response({
        error: err.message,
      })
      .code(400);
  }
};

module.exports = [
  { method: "GET", path: "/usuario", handler: usuariosHandler },
  {
    method: "POST",
    path: "/usuario",
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
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createUsuarioHandler,
  },
  {
    method: "PUT",
    path: "/usuario/{id}",
    config: {
      validate: {
        payload: Joi.object({
          nombre: Joi.string().min(3).max(25).optional(),
          apellido: Joi.string().min(3).max(25).optional(),
          nombre_usuario: Joi.string().max(25).min(5).optional(),
          contrasena: Joi.string().min(6).max(20).optional(),
          edad: Joi.date().optional(),
          genero: Joi.string().max(1).optional(),
          numero: Joi.number().integer().min(1000000000).max(9999999999).optional(),
          correo: Joi.string().min(3).optional(),
          redes1: Joi.string().optional(),
          redes2: Joi.string().optional(),
          redes3: Joi.string().optional(),
          coleccion: Joi.string(),
          imagen_perfil: Joi.string().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updateUsuarioHandler,
  },
  // { method: 'DELETE', path: '/usuario/{id}', handler: deleteUsuarioHandler },
  //     { method: 'GET', path: '/todoi/{id}', handler: {  directory: { path: '../almacen_imagenes', listing: false}}},
  //     { method: 'DELETE', path: '/imagen/{id}', handler: deleteImageUsuarioHandler},
  //     { method: 'GET', path: '/imagen/{id}', handler: {  directory: { path: '../almacen_imagenes/perfil', listing: false}}},
  //     { method: 'GET',  path: '/todou/{id}', handler: (request, h) => {return h.file('../almacen_imagenes/aqui/imagen1.jpg')}},
];
