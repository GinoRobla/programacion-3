const turnosModel = require("../../models/mock/turnos.models.js");
const Turno = require("../../models/mock/entities/turno.entity.js");

const listarPorPaciente = async (req, res) => {
    const idPaciente = req.params.idPaciente;
    const turnos = await turnosModel.getByPacienteId(idPaciente);

    return res.status(200).json({
        turnos
    });
};

const crear = async (req, res) => {
    const { fecha, hora, pacienteId } = req.body;
    const nuevoTurno = new Turno(null, fecha, hora, pacienteId);

    const info = await turnosModel.create(nuevoTurno);
    return res.status(201).json({
        mensaje: "Turno creado correctamente",
        turno: info
    });
};

const actualizar = async (req, res) => {
    const idTurno = req.params.idTurno;
    const { fecha, hora, pacienteId } = req.body;
    const turnoActualizado = new Turno(null, fecha, hora, pacienteId);

    const newInfo = await turnosModel.update(idTurno, turnoActualizado);

    res.status(200).json({
        mensaje: "Turno actualizado correctamente",
        turno: newInfo
    });
};

const borrar = async (req, res) => {
    const idTurno = req.params.idTurno;
    await turnosModel.delete(idTurno);

    res.status(200).json({
        mensaje: "Turno eliminado correctamente"
    });
};

module.exports = {
    listarPorPaciente,
    crear,
    actualizar,
    borrar
};
