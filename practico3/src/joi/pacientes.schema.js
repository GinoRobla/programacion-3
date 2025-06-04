const Joi = require("joi");

const pacienteSchema = Joi.object({
    dni: Joi.string().min(8).max(8).required(),
    nombre: Joi.string().min(2).required(),
    apellido: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

module.exports = pacienteSchema;
