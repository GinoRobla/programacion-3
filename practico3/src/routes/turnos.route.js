const {Router} = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const rutaTurnos = Router();
// Obtener turnos por ID de paciente (obligatorio)
rutaTurnos.get('/:idPaciente', turnosController.listarPorPaciente);

// Crear nuevo turno (requiere autenticación JWT)
rutaTurnos.post('/', verifyTokenMiddleware, turnosController.crear);

// Actualizar turno por ID (obligatorio)
rutaTurnos.put('/:idTurno', turnosController.actualizar);

// Cancelar turno por ID (obligatorio)
rutaTurnos.delete('/:idTurno', turnosController.borrar);

module.exports = rutaTurnos;