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
        turno.id = this.id;
        this.id++;
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
        const pos = this.data.indexOf(turnoEncontrado);
        this.data[pos] = { ...turnoEncontrado, ...turno, id: turnoEncontrado.id };
        resolve(this.data[pos]);
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
