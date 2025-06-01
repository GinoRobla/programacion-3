const {Router} = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const rutaTurnos = Router();

rutaTurnos.get('/:idPaciente', turnosController.listarPorPaciente);

rutaTurnos.post('/', verifyTokenMiddleware, turnosController.crear);

rutaTurnos.put('/:idTurno', turnosController.actualizar);

rutaTurnos.delete('/:idTurno', turnosController.borrar);

module.exports = rutaTurnos;