const Models = require("../models/index");
const Joi = require("joi");

const judgesHandler = async (request, h) => {
  try {
    const judges = await Models.judge.findAll({});
    return { data: judges };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createJudgeHandler = async (request, h) => {
  try {
    const { judgeCode, id_user, Id_event } = request.payload;
    const judge = await Models.judge.create({
      judgeCode: judgeCode,

      id_user: id_user,
      Id_event: Id_event,
    });
    return {
      data: judge,
      message: "New judge has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const updateJudgeHandler = async (request, h) => {
  try {
    const judge_id = request.params.id;
    const { judgeCode, id_user, Id_event } = request.payload;
    const judge = await Models.judge.update(
      {
        judgeCode: judgeCode,

        id_user: id_user,

        Id_event: Id_event,
      },
      {
        where: {
          id: judge_id,
        },
      }
    );
    return {
      message: "judge has been updated.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deleteJudgeHandler = async (request, h) => {
  try {
    const judge_id = request.params.id;
    await Models.judge.destroy({
      where: {
        id: judge_id,
      },
    });
    return { message: "Judge has been deleted." };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

module.exports = [
  { method: "GET", path: "/judge", handler: judgesHandler },

  {
    method: "POST",
    path: "/judge",
    config: {
      validate: {
        payload: Joi.object({
          judgeCode: Joi.string().min(1).max(40).required(),

          id_user: Joi.number().required(),
          Id_event: Joi.number().required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createJudgeHandler,
  },
  {
    method: "PUT",
    path: "/judge/{id}",
    config: {
      validate: {
        payload: Joi.object({
          judgeCode: Joi.string().min(1).max(40).optional(),

          id_user: Joi.number().optional(),
          Id_event: Joi.number().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updateJudgeHandler,
  },
  { method: "DELETE", path: "/judge/{id}", handler: deleteJudgeHandler },
];
