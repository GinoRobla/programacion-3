const { Router } = require('express');
const pacientesModel = require('../models/mock/pacientes.models.js');
const turnosModel = require('../models/mock/turnos.models.js');
const validation = require('../middlewares/validation.js');
const pacienteSchema = require('../joi/pacientes.schema.js');
const turnoSchema = require('../joi/turnos.schema.js');
const router = Router();

router.get('/', (req, res) => res.render('login', { error: null }));

router.get('/app', async (req, res) => {
    const pacientes = await pacientesModel.list();
    res.render('app', {
        pacientes,
        turnos: [],
        pacienteSeleccionado: null,
        pacienteMsg: null,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Crear paciente
router.post('/crear-paciente', validation(pacienteSchema), async (req, res) => {
    const { dni, nombre, apellido, email, password } = req.body;
    let pacienteMsg = null;
    try {
        await pacientesModel.create({ dni, nombre, apellido, email, password });
        pacienteMsg = "Paciente creado correctamente";
    } catch (error) {
        pacienteMsg = error.message;
    }
    const pacientes = await pacientesModel.list();
    res.render('app', {
        pacientes,
        turnos: [],
        pacienteSeleccionado: null,
        pacienteMsg,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Eliminar paciente
router.post('/eliminar-paciente', async (req, res) => {
    const { id } = req.body;
    let pacienteMsg = null;
    try {
        await pacientesModel.delete(id);
        pacienteMsg = "Paciente eliminado correctamente";
    } catch (error) {
        pacienteMsg = error.message;
    }
    const pacientes = await pacientesModel.list();
    res.render('app', {
        pacientes,
        turnos: [],
        pacienteSeleccionado: null,
        pacienteMsg,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Buscar paciente por ID
router.post('/buscar-paciente-id', async (req, res) => {
    const { id } = req.body;
    const pacientes = await pacientesModel.list();
    let pacienteBuscado = null;
    let buscarPacienteMsg = null;
    try {
        pacienteBuscado = await pacientesModel.getPacienteById(id);
        if (!pacienteBuscado) buscarPacienteMsg = "No se encontró el paciente";
    } catch (error) {
        buscarPacienteMsg = error.message;
    }
    res.render('app', {
        pacientes,
        turnos: [],
        pacienteSeleccionado: null,
        pacienteMsg: null,
        turnoMsg: null,
        pacienteBuscado,
        buscarPacienteMsg,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Buscar paciente por Email
router.post('/buscar-paciente-email', async (req, res) => {
    const { email } = req.body;
    const pacientes = await pacientesModel.list();
    let pacienteBuscadoEmail = null;
    let buscarPacienteEmailMsg = null;
    try {
        pacienteBuscadoEmail = await pacientesModel.findByEmail(email);
        if (!pacienteBuscadoEmail) buscarPacienteEmailMsg = "No se encontró el paciente";
    } catch (error) {
        buscarPacienteEmailMsg = error.message;
    }
    res.render('app', {
        pacientes,
        turnos: [],
        pacienteSeleccionado: null,
        pacienteMsg: null,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail,
        buscarPacienteEmailMsg,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Actualizar paciente
router.post('/actualizar-paciente', validation(pacienteSchema), async (req, res) => {
    const { id, nombre, apellido, email, password, dni } = req.body;
    const pacientes = await pacientesModel.list();
    let actualizarPacienteMsg = null;
    try {
        await pacientesModel.update(id, { nombre, apellido, email, password, dni });
        actualizarPacienteMsg = "Paciente actualizado correctamente";
    } catch (error) {
        actualizarPacienteMsg = error.message;
    }
    res.render('app', {
        pacientes,
        turnos: [],
        pacienteSeleccionado: null,
        pacienteMsg: null,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Listar turnos de un paciente
router.post('/listar-turnos', async (req, res) => {
    const { idPaciente } = req.body;
    const pacientes = await pacientesModel.list();
    const turnos = await turnosModel.getByPacienteId(idPaciente);
    res.render('app', {
        pacientes,
        turnos,
        pacienteSeleccionado: idPaciente,
        pacienteMsg: null,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Crear turno
router.post('/crear-turno', validation(turnoSchema), async (req, res) => {
    const { fecha, hora, pacienteId } = req.body;
    let turnoMsg = null;
    try {
        await turnosModel.create({ fecha, hora, pacienteId });
        turnoMsg = "Turno creado correctamente";
    } catch (error) {
        turnoMsg = error.message;
    }
    const pacientes = await pacientesModel.list();
    const turnos = await turnosModel.getByPacienteId(pacienteId);
    res.render('app', {
        pacientes,
        turnos,
        pacienteSeleccionado: pacienteId,
        pacienteMsg: null,
        turnoMsg,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg: null
    });
});

// Eliminar turno por ID
router.post('/eliminar-turno', async (req, res) => {
    const { idTurno } = req.body;
    let eliminarTurnoMsg = null;
    try {
        await turnosModel.delete(idTurno);
        eliminarTurnoMsg = "Turno eliminado correctamente";
    } catch (error) {
        eliminarTurnoMsg = error.message;
    }
    const pacientes = await pacientesModel.list();
    const turnos = [];
    res.render('app', {
        pacientes,
        turnos,
        pacienteSeleccionado: null,
        pacienteMsg: null,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg,
        actualizarTurnoMsg: null
    });
});

// Actualizar turno por ID
router.post('/actualizar-turno', async (req, res) => {
    const { idTurno, fecha, hora, pacienteId } = req.body;
    let actualizarTurnoMsg = null;
    try {
        await turnosModel.update(idTurno, { fecha, hora, pacienteId });
        actualizarTurnoMsg = "Turno actualizado correctamente";
    } catch (error) {
        actualizarTurnoMsg = error.message;
    }
    const pacientes = await pacientesModel.list();
    const turnos = [];
    res.render('app', {
        pacientes,
        turnos,
        pacienteSeleccionado: null,
        pacienteMsg: null,
        turnoMsg: null,
        pacienteBuscado: null,
        buscarPacienteMsg: null,
        pacienteBuscadoEmail: null,
        buscarPacienteEmailMsg: null,
        actualizarPacienteMsg: null,
        eliminarTurnoMsg: null,
        actualizarTurnoMsg
    });
});

// Login y logout
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        await pacientesModel.validate(email, password);
        res.redirect('/app');
    } catch (error) {
        res.render('login', { error: 'Credenciales incorrectas' });
    }
});

router.post('/logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;