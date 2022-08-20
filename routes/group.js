const Models = require("../models/index");
const Joi = require("joi");

const groupsHandler = async (request, h) => {
  try {
    const groups = await Models.group.findAll({});
    return { data: groups };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createGroupHandler = async (request, h) => {
  try {
    const { name, category, id_event, email, phone } = request.payload;
    const group = await Models.group.create({
      name: name,
      category: category,
      id_event: id_event,
      email: email,
      phone: phone,
    });
    return {
      data: group,
      message: "New group has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const updateGroupHandler = async (request, h) => {
  try {
    const group_id = request.params.id;
    const { name, category, id_event, email, phone } = request.payload;
    const group = await Models.group.update(
      {
        name: name,
        category: category,
        id_event: id_event,
        email: email,
        phone: phone,
      },
      {
        where: {
          id: group_id,
        },
      }
    );
    return {
      message: "Group has been updated.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deleteGroupHandler = async (request, h) => {
  try {
    const group_id = request.params.id;
    await Models.Group.destroy({
      where: {
        id: group_id,
      },
    });
    return { message: "Group has been deleted." };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

module.exports = [
  { method: "GET", path: "/group", handler: groupsHandler },
  {
    method: "POST",
    path: "/group",
    config: {
      validate: {
        payload: Joi.object({
          name: Joi.string().min(1).max(40).required(),
          category: Joi.string().min(3).max(25).required(),
          id_event: Joi.number().max(250).min(3),
          email: Joi.string().min(3).required(),
          phone: Joi.number().integer().min(1000000000).max(9999999999),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createGroupHandler,
  },
  {
    method: "PUT",
    path: "/group/{id}",
    config: {
      validate: {
        payload: Joi.object({
          name: Joi.string().min(1).max(40).optional(),
          category: Joi.string().min(3).max(25).optional(),
          id_event: Joi.number().optional(),
          email: Joi.string().min(3).optional(),
          phone: Joi.number().integer().min(1000000000).max(9999999999),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updateGroupHandler,
  },
  { method: "DELETE", path: "/group/{id}", handler: deleteGroupHandler },
];
