const turnosModel = require("../../models/mock/turnos.models.js");
const Turno = require("../../models/mock/entities/turno.entity.js");

const listarPorPaciente = async (req, res) => {
try {
    const idPaciente = req.params.idPaciente;
    const turnos = await turnosModel.getByPacienteId(idPaciente);

    if (!turnos || turnos.length === 0) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se encontraron turnos para este paciente"
        });
    }

    return res.status(200).json({
        status: "success",
        turnos
    });
}catch (error) {
    return res.status(500).json({
        status: "error",
        mensaje: "Error al obtener turnos",
        error: error.message
        });
    }
};

const crear = async (req, res) => {
try {
    const { fecha, hora, pacienteId } = req.body;

    // Validar campos
    if (!fecha || !hora || !pacienteId) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos obligatorios"
        });
    }

    const nuevoTurno = new Turno(0, fecha, hora, Number(pacienteId));
    const turnoCreado = await turnosModel.create(nuevoTurno);

    return res.status(200).json({
        status: "success",
        mensaje: "Turno creado correctamente",
        turno: turnoCreado
    });
} catch (error) {
    return res.status(500).json({
        status: "error",
        mensaje: "Error al crear el turno",
        error: error.message
        });
    }
};

const actualizar = async (req, res) => {
try {
    const idTurno = req.params.idTurno;
    const { fecha, hora, pacienteId } = req.body;

    // Validar campos
    if (!fecha || !hora || !pacienteId) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos obligatorios"
        });
    }

    const turnoActualizado = await turnosModel.update(idTurno, { fecha, hora, pacienteId });

    if (!turnoActualizado) {
        return res.status(404).json({
            status: "error",
            mensaje: "Turno no encontrado"
        });
    }

    return res.status(200).json({
        status: "success",
        mensaje: "Turno actualizado correctamente",
        turno: turnoActualizado
        });
    } catch (error) {
    return res.status(500).json({
        status: "error",
        mensaje: "Error al actualizar el turno",
        error: error.message
        });
    }
}

const borrar = async (req, res) => {
try {
    const idTurno = req.params.idTurno;
    const turno = await turnosModel.delete(idTurno);

    if (!turno) {
            return res.status(404).json({
            status: "error",
            mensaje: "Turno no encontrado"
        });
    }

    return res.status(200).json({
        status: "success",
        mensaje: "Turno cancelado correctamente",
        turno
    });
} catch (error) {
    return res.status(500).json({
        status: "error",
        mensaje: "Error al cancelar el turno",
        error: error.message
        });
    }
};


module.exports = {
    listarPorPaciente,
    crear,
    borrar,
    actualizar
};
