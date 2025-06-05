const pacientesModel = require("../models/mock/pacientes.models.js");

const validation = (schema) => {
    return async (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            // Si la petición espera HTML (EJS), renderiza la vista con el error
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                const pacientes = await pacientesModel.list();
                return res.render('app', {
                    pacientes,
                    turnos: [],
                    pacienteSeleccionado: null,
                    pacienteMsg: error.details[0].message,
                    turnoMsg: null,
                    pacienteBuscado: null,
                    buscarPacienteMsg: null,
                    pacienteBuscadoEmail: null,
                    buscarPacienteEmailMsg: null,
                    actualizarPacienteMsg: null,
                    eliminarTurnoMsg: null,
                    actualizarTurnoMsg: null
                });
            }
            // Si es API, responde JSON
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
        next();
    };
}

module.exports = validation;