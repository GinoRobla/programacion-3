const {Router} = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const rutaTurnos = Router();

rutaTurnos.get('/:idPaciente', verifyTokenMiddleware, turnosController.listarPorPaciente);

rutaTurnos.post('/', verifyTokenMiddleware, turnosController.crear);

rutaTurnos.put('/:idTurno', verifyTokenMiddleware, turnosController.actualizar);

rutaTurnos.delete('/:idTurno', verifyTokenMiddleware, turnosController.borrar);

module.exports = rutaTurnos;