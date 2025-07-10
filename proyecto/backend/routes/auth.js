const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerSchema, loginSchema, validateBody } = require('../middleware/joiValidator');
const { verify } = require('jsonwebtoken');
const { verifyToken } = require('../middleware/jwt');

// Rutas de autenticación usando middleware de validación Joi
router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.get('/me', verifyToken, authController.me);

module.exports = router;
