const Models = require("../models/index");
const Joi = require("joi");

const eventsHandler = async (request, h) => {
  try {
    const events = await Models.event.findAll({});
    return { data: events };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createEventHandler = async (request, h) => {
  try {
    const { nameEvent, id_user, finishTime, beginTime, description, phone, eventCode, activeEvent } = request.payload;
    const event = await Models.event.create({
      nameEvent: nameEvent,
      id_user: id_user,
      finishTime: finishTime,
      beginTime: beginTime,
      description: description,
      phone: phone,
      eventCode: eventCode,
      activeEvent: activeEvent,
    });
    return {
      data: event,
      message: "New event has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const updateEventHandler = async (request, h) => {
  try {
    const event_id = request.params.id;
    const { nameEvent, id_user, finishTime, beginTime, description, phone, eventCode, activeEvent } = request.payload;
    const event = await Models.event.update(
      {
        nameEvent: nameEvent,

        id_user: id_user,
        finishTime: finishTime,
        beginTime: beginTime,
        description: description,
        phone: phone,

        eventCode: eventCode,
        activeEvent: activeEvent,
      },
      {
        where: {
          id: event_id,
        },
      }
    );
    return {
      message: "event has been updated.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deleteEventHandler = async (request, h) => {
  try {
    const event_id = request.params.id;
    await Models.event.destroy({
      where: {
        id: event_id,
      },
    });
    return { message: "Event has been deleted." };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

module.exports = [
  { method: "GET", path: "/event", handler: eventsHandler },

  {
    method: "POST",
    path: "/event",
    config: {
      validate: {
        payload: Joi.object({
          nameEvent: Joi.string().min(1).max(40).required(),

          id_user: Joi.number(),
          finishTime: Joi.date().optional(),
          beginTime: Joi.date().optional(),
          description: Joi.string().optional(),

          phone: Joi.number().integer().min(1000000000).max(9999999999),
          eventCode: Joi.string().min(1).max(40).required(),
          activeEvent: Joi.boolean().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createEventHandler,
  },
  {
    method: "PUT",
    path: "/event/{id}",
    config: {
      validate: {
        payload: Joi.object({
          nameEvent: Joi.string().min(1).max(40).optional(),
          id_user: Joi.number(),
          finishTime: Joi.date().optional(),
          beginTime: Joi.date().optional(),
          description: Joi.string().optional(),
          phone: Joi.number().integer().min(1000000000).max(9999999999),
          eventCode: Joi.string().min(1).max(40).optional(),
          activeEvent: Joi.boolean().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updateEventHandler,
  },
  { method: "DELETE", path: "/event/{id}", handler: deleteEventHandler },
];
