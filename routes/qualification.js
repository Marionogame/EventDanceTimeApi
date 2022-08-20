const Models = require("../models/index");
const Joi = require("joi");

const qualificationsHandler = async (request, h) => {
  try {
    const qualifications = await Models.qualification.findAll({});
    return { data: qualifications };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createQualificationHandler = async (request, h) => {
  try {
    const { skill, coordination, scenography, choreography, creativity, id_group, id_judge } = request.payload;
    const qualification = await Models.qualification.create({
      skill: skill,
      scenography: scenography,
      coordination: coordination,
      choreography: choreography,
      creativity: creativity,
      id_group: id_group,
      id_judge: id_judge,
    });
    return {
      data: qualification,
      message: "New qualification has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const updateQualificationHandler = async (request, h) => {
  try {
    const qualification_id = request.params.id;
    const { skill, coordination, scenography, choreography, creativity, id_group, id_judge } = request.payload;

    const qualification = await Models.qualification.update(
      {
        skill: skill,
        scenography: scenography,
        coordination: coordination,
        choreography: choreography,
        creativity: creativity,
        id_group: id_group,
        id_judge: id_judge,
      },
      {
        where: {
          id: qualification_id,
        },
      }
    );
    return {
      message: "Qualification has been updated.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deleteQualificationHandler = async (request, h) => {
  try {
    const qualification_id = request.params.id;
    await Models.qualification.destroy({
      where: {
        id: qualification_id,
      },
    });
    return { message: "Qualification has been deleted." };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

module.exports = [
  { method: "GET", path: "/qualification", handler: qualificationsHandler },

  {
    method: "POST",
    path: "/qualification",
    config: {
      validate: {
        payload: Joi.object({
          skill: Joi.number(),
          scenography: Joi.number(),
          coordination: Joi.number(),
          choreography: Joi.number(),
          creativity: Joi.number(),
          id_group: Joi.number(),
          id_judge: Joi.number(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createQualificationHandler,
  },
  {
    method: "PUT",
    path: "/qualification/{id}",
    config: {
      validate: {
        payload: Joi.object({
          skill: Joi.number().optional(),
          scenography: Joi.number().precision(2).optional(),
          coordination: Joi.number().precision(2).optional(),
          choreography: Joi.number().precision(2).optional(),
          creativity: Joi.number().precision(2).optional(),
          id_group: Joi.number().optional(),
          id_judge: Joi.number().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updateQualificationHandler,
  },
  { method: "DELETE", path: "/qualification/{id}", handler: deleteQualificationHandler },
];
