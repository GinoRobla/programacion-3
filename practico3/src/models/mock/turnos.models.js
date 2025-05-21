const Turno = require("./entities/turno.entity.js");

class TurnosModel {
  constructor() {
    this.data = [];

    this.data.push(
      new Turno(1, "2025-06-01", "10:00", 1),
      new Turno(2, "2025-06-01", "11:00", 2),
      new Turno(3, "2025-06-02", "12:00", 1)
    );

    this.id = 4;
  }

  // Obtener turnos por ID de paciente
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

  // Crear un nuevo turno
  create(turno) {
    return new Promise((resolve, reject) => {
      try {
        turno.id = this.id;
        this.id++;
        this.data.push(turno);
        resolve(turno);
      } catch (error) {
        reject(error);
      }
    });
  }
  // Actualizar un turno por ID
  update(id, turno) {
    return new Promise((resolve, reject) => {
      try {
        const turnoEncontrado = this.data.find((t) => t.id == id);
        if (!turnoEncontrado) {
          throw new Error("El turno no existe");
        }
        const pos = this.data.indexOf(turnoEncontrado);
        this.data[pos] = { ...turnoEncontrado, ...turno };
        resolve(this.data[pos]);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Eliminar un turno por ID
  delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const turnoEncontrado = this.data.find((t) => t.id == id);
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

  // Listar todos los turnos
  list() {
    return new Promise((resolve) => {
      resolve(this.data);
    });
  }

  // Buscar turno por ID
  getById(id) {
    return new Promise((resolve, reject) => {
      try {
        const turno = this.data.find((t) => t.id == id);
        if (!turno) {
          throw new Error("Turno no encontrado");
        }
        resolve(turno);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new TurnosModel();
