const Models = require("../models/index");
const Joi = require("joi");
const fs = require("fs");
const publicationsHandler = async (request, h) => {
  try {
    const publications = await Models.publication.findAll({});
    return { data: publications };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createPublicationHandler = async (request, h) => {
  try {
    const { image, id_user, Text, title, subTitle, like } = request.payload;
    const publication = await Models.publication.create({
      like: like,
      title: title,
      subTitle: subTitle,
      id_user: id_user,
      Text: Text,
      image: image,
    });
    return {
      data: publication,
      message: "New Publication has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const updatePublicationHandler = async (request, h) => {
  try {
    const publication_id = request.params.id;
    const { image, id_user, Text, like, title, subTitle } = request.payload;
    const publication = await Models.publication.update(
      {
        like: like,
        title: title,
        subTitle: subTitle,
        Text: Text,
        image: image,
      },
      {
        where: {
          id: publication_id,
        },
      }
    );
    return {
      message: "publication has been updated.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deletePublicationHandler = async (request, h) => {
  try {
    const publication_id = request.params.id;
    await Models.publication.destroy({
      where: {
        id: publication_id,
      },
    });
    return { message: "Publication has been deleted." };
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
  { method: "GET", path: "/publication", handler: publicationsHandler },

  {
    method: "POST",
    path: "/publication",
    config: {
      validate: {
        payload: Joi.object({
          Text: Joi.string().min(1).max(260).required(),
          title: Joi.string().min(1).max(40).required(),
          subTitle: Joi.string().min(1).max(100).required(),
          image: Joi.string().min(1).max(260).required(),
          like: Joi.number(),
          id_user: Joi.number(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createPublicationHandler,
  },
  {
    method: "PUT",
    path: "/publication/{id}",
    config: {
      validate: {
        payload: Joi.object({
          Text: Joi.string().min(1).max(260).optional(),
          title: Joi.string().min(1).max(40).optional(),
          subTitle: Joi.string().min(1).max(100).optional(),
          image: Joi.string().min(1).max(260).optional(),
          like: Joi.number(),
          id_user: Joi.number(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updatePublicationHandler,
  },
  { method: "DELETE", path: "/publication/{id}", handler: deletePublicationHandler },

  { method: "GET", path: "/todoi/{id}", handler: { directory: { path: "../almacen_imagenes", listing: false } } },
  { method: "DELETE", path: "/imagen/{id}", handler: deleteImageUserHandler },
  { method: "GET", path: "/imagen/{id}", handler: { directory: { path: "../almacen_imagenes/perfil", listing: false } } },
  {
    method: "GET",
    path: "/todou/{id}",
    handler: (request, h) => {
      return h.file("../almacen_imagenes/aqui/imagen1.jpg");
    },
  },
];
