const {Router} = require('express');
const pacientesController = require('../controllers/API/pacientes.controller.js');
const  {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const validation = require('../middlewares/validation.js');
const pacienteSchema = require('../joi/pacientes.schema.js');
const rutaPacientes = Router();

rutaPacientes.get('/', verifyTokenMiddleware, pacientesController.list);

rutaPacientes.post('/login', pacientesController.login);

rutaPacientes.post('/',verifyTokenMiddleware, validation(pacienteSchema), pacientesController.create);

rutaPacientes.put('/:id',verifyTokenMiddleware, validation(pacienteSchema), pacientesController.update);

rutaPacientes.delete('/:id',verifyTokenMiddleware, pacientesController.delete);

rutaPacientes.get('/:id', verifyTokenMiddleware, pacientesController.findById);

rutaPacientes.post('/findByEmail', verifyTokenMiddleware, pacientesController.findByEmail);


module.exports = rutaPacientes;