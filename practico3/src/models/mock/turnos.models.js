const Turno = require("./entities/turno.entity.js");

class TurnosModel {
  constructor() {
    this.data = [];

    this.data.push(
      new Turno(1, "2025-06-01", "10:00", 1),
      new Turno(2, "2025-06-01", "11:00", 1),
      new Turno(3, "2025-06-02", "12:00", 1)
    );

    this.id = 4;
  }

  getByPacienteId(pacienteId) {
    return new Promise((resolve, reject) => {
      try {
        const id = Number(pacienteId);
        const turnos = this.data.filter((t) => t.pacienteId === id);
        resolve(turnos);
      } catch (error) {
        reject(error);
      }
    });
  }

  create(turno) {
    return new Promise((resolve, reject) => {
      try {
        // Buscar el menor ID libre
        let newId = 1;
        const ids = this.data.map(t => t.id).sort((a, b) => a - b);
        for (let i = 0; i < ids.length; i++) {
          if (ids[i] !== i + 1) {
            newId = i + 1;
            break;
          }
          newId = ids.length + 1;
        }
        turno.id = newId;
        turno.pacienteId = Number(turno.pacienteId);
        this.data.push(turno);
        resolve(turno);
      } catch (error) {
        reject(error);
      }
    });
}

  update(id, turno) {
    return new Promise((resolve, reject) => {
      try {
        const turnoEncontrado = this.data.find((t) => t.id === Number(id));
        if (!turnoEncontrado) {
          throw new Error("El turno no existe");
        }
        // Actualizar solo los campos enviados, conservando los originales si no se envían
        turnoEncontrado.fecha = turno.fecha || turnoEncontrado.fecha;
        turnoEncontrado.hora = turno.hora || turnoEncontrado.hora;
        turnoEncontrado.pacienteId = turno.pacienteId ? Number(turno.pacienteId) : turnoEncontrado.pacienteId;
        resolve(turnoEncontrado);
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const turnoEncontrado = this.data.find((t) => t.id === Number(id));
        if (!turnoEncontrado) {
          throw new Error("El turno no existe");
        }
        const pos = this.data.indexOf(turnoEncontrado);
        this.data.splice(pos, 1);
        resolve(turnoEncontrado);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new TurnosModel();
