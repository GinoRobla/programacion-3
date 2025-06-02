const pacientesModel = require('../../models/mock/pacientes.models');
const turnosModel = require('../../models/mock/turnos.models');

const home = async (req, res) => {
    try {
        const pacientes = await pacientesModel.list();
        const turnos = await turnosModel.list();

        const turnosConNombre = turnos.map(turno => {
            const paciente = pacientes.find(p => p.id === turno.pacienteId);
            return {
                id: turno.id,
                paciente: paciente ? paciente.nombre : 'Desconocido',
                fecha: turno.fecha,
                estado: turno.estado
            };
        });

        res.render('ejs/index', {
            pacientes,
            turnos: turnosConNombre
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los datos.');
    }
};

module.exports = {
    home
};
