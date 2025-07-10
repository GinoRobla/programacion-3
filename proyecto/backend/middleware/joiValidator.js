const Joi = require('joi');

// Esquema para registro
const registerSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    initialBalance: Joi.number().min(0).default(0)
});

// Esquema para login
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});


// Middleware para validar con Joi
function validateBody(schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json({ error: result.error.details[0].message});
        }
        next();
    };
}

module.exports = {
    registerSchema,
    loginSchema,
    validateBody
};
