const Models = require("../models/index");
const Joi = require("joi");

const productosHandler = async (request, h) => {
  try {
    const productos = await Models.Productos.findAll({});
    return { data: productos };
  } catch (error) {
    return h.response({ error: error.message }).code(400);
  }
};

const createProductoHandler = async (request, h) => {
  try {
    const { nombre, categoria, descripcion, precio, estado_venta, fecha_creacion, medida_alto, medida_ancho, imagen, id_usuario, estilo, tecnica, soporte } =
      request.payload;
    const producto = await Models.Productos.create({
      nombre: nombre,
      categoria: categoria,
      descripcion: descripcion,
      precio: precio,
      estado_venta: estado_venta,
      fecha_creacion: fecha_creacion,
      medida_alto: medida_alto,
      medida_ancho: medida_ancho,
      imagen: imagen,
      id_usuario: id_usuario,
      estilo: estilo,
      tecnica: tecnica,
      soporte: soporte,
    });
    return {
      data: producto,
      message: "New producto has been created.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const updateProductoHandler = async (request, h) => {
  try {
    const producto_id = request.params.id;
    const { nombre, categoria, descripcion, precio, estado_venta, fecha_creacion, medida_alto, medida_ancho, imagen, id_usuario, estilo, tecnica, soporte } =
      request.payload;
    const producto = await Models.Productos.update(
      {
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        precio: precio,
        estado_venta: estado_venta,
        fecha_creacion: fecha_creacion,
        medida_alto: medida_alto,
        medida_ancho: medida_ancho,
        imagen: imagen,
        id_usuario: id_usuario,
        estilo: estilo,
        tecnica: tecnica,
        soporte: soporte,
      },
      {
        where: {
          id: producto_id,
        },
      }
    );
    return {
      message: "Producto has been updated.",
    };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

const deleteProductoHandler = async (request, h) => {
  try {
    const producto_id = request.params.id;
    await Models.Producto.destroy({
      where: {
        id: producto_id,
      },
    });
    return { message: "Producto has been deleted." };
  } catch (error) {
    return h
      .response({
        error: error.message,
      })
      .code(400);
  }
};

module.exports = [
  { method: "GET", path: "/producto", handler: productosHandler },
  {
    method: "POST",
    path: "/producto",
    config: {
      validate: {
        payload: Joi.object({
          nombre: Joi.string().min(1).max(40).required(),
          categoria: Joi.string().min(3).max(25).required(),
          descripcion: Joi.string().max(250).min(3),
          precio: Joi.number().precision(2).required(),
          estado_de_venta: Joi.string().max(1).required(),
          fecha_creacion: Joi.date().required(),
          medida_alto: Joi.number().precision(2).required(),
          medida_ancho: Joi.number().precision(2).required(),
          id_usuario: Joi.number().required(),
          imagen: Joi.string().required(),
          estilo: Joi.string().min(3).max(25).required(),
          tecnica: Joi.string().min(3).max(25).required(),
          soporte: Joi.string().min(3).max(25).required(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: createProductoHandler,
  },
  {
    method: "PUT",
    path: "/producto/{id}",
    config: {
      validate: {
        payload: Joi.object({
          nombre: Joi.string().min(1).max(40).optional(),
          categoria: Joi.string().min(3).max(25).optional(),
          descripcion: Joi.string().max(250).min(3).optional(),
          precio: Joi.number().precision(2).optional(),
          estado_de_venta: Joi.string().max(1).optional(),
          fecha_creacion: Joi.date().required().optional(),
          medida_alto: Joi.number().precision(2).optional(),
          medida_ancho: Joi.number().precision(2).optional(),
          imagen: Joi.string().required().optional(),
          id_usuario: Joi.number().optional(),
          estilo: Joi.string().min(3).max(25).required().optional(),
          tecnica: Joi.string().min(3).max(25).required().optional(),
          soporte: Joi.string().min(3).max(25).required().optional(),
        }),
        failAction: (request, h, error) => {
          return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        },
      },
    },
    handler: updateProductoHandler,
  },
  { method: "DELETE", path: "/producto/{id}", handler: deleteProductoHandler },
];
