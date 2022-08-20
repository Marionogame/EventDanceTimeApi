const Models = require("../models/index");
const path = require("path");

const Joi = require("joi");
const fs = require("fs");
const usersHandler = async (request, h) => {
  try {
    const users = await Models.user.findAll({});
    return { data: users };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createUserHandler = async (request, h) => {
  try {
    const { name, institution, occupation, password, description, email, phone, image } = request.payload;
    const user = await Models.user.create({
      name: name,
      institution: institution,
      occupation: occupation,
      password: password,
      description: description,
      email: email,
      phone: phone,
      image: image,
    });
    return {
      data: user,
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

const updateUserHandler = async (request, h) => {
  try {
    const user_id = request.params.id;
    const { name, institution, occupation, password, description, email, phone, image } = request.payload;
    const user = await Models.user.update(
      {
        name: name,
        institution: institution,
        occupation: occupation,
        password: password,
        description: description,
        email: email,
        phone: phone,
        image: image,
      },
      {
        where: {
          id: user_id,
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

const deleteUserHandler = async (request, h) => {
  try {
    const user_id = request.params.id;
    await Models.user.destroy({
      where: {
        id: user_id,
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
const deleteImageUserHandler = async (request, h) => {
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
  { method: "GET", path: "/user", handler: usersHandler },
  {
    method: "POST",
    path: "/user",
    config: {
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).max(25).required(),
          institution: Joi.string().required(),
          occupation: Joi.string().required(),
          password: Joi.string().min(3).max(25).required(),

          description: Joi.string().required(),
          phone: Joi.number().integer().min(1000000000).max(9999999999),
          email: Joi.string().min(3).required(),
          image: Joi.string().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createUserHandler,
  },
  {
    method: "PUT",
    path: "/user/{id}",
    config: {
      validate: {
        payload: Joi.object({
          name: Joi.string().min(3).max(25).optional(),
          institution: Joi.string().required().optional(),
          password: Joi.string().min(3).max(25).optional(),
          occupation: Joi.string().optional(),
          description: Joi.string().optional(),
          phone: Joi.number().integer().min(1000000000).max(9999999999),
          email: Joi.string().min(3).optional(),
          image: Joi.string().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updateUserHandler,
  },
  { method: "DELETE", path: "/user/{id}", handler: deleteUserHandler },
  //   { method: "GET", path: "/todoi/{id}", handler: { directory: { path: "../almacen_imagenes", listing: false } } },
  //   { method: "DELETE", path: "/imagen/{id}", handler: deleteImageUserHandler },
  //   { method: "GET", path: "/imagen/{id}", handler: { directory: { path: "../almacen_imagenes/perfil", listing: false } } },
  //   {
  //     method: "GET",
  //     path: "/todou/{id}",
  //     handler: (request, h) => {
  //       return h.file("../almacen_imagenes/aqui/imagen1.jpg");
  //     },
  //   },
];
