const { Router } = require("express");
const turnosController = require("../controllers/API/turnos.controller.js");
const { verifyTokenMiddleware } = require("../middlewares/verifyToken.middleware.js");
const validation = require("../middlewares/validation.js");
const turnoSchema = require("../joi/turnos.schema.js");

const rutaTurnos = Router();

rutaTurnos.get("/:idPaciente", verifyTokenMiddleware, turnosController.listarPorPaciente);
rutaTurnos.post("/", verifyTokenMiddleware, validation(turnoSchema), turnosController.crear);
rutaTurnos.put("/:idTurno", verifyTokenMiddleware, validation(turnoSchema), turnosController.actualizar);
rutaTurnos.delete("/:idTurno", verifyTokenMiddleware, turnosController.borrar);

module.exports = rutaTurnos;
