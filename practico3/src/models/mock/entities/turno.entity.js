const Identificador = require("./identificador.entity");

class Turno extends Identificador {
constructor(id=null,fecha, hora, pacienteId) {
    super(id); 
    this.fecha = fecha;
    this.hora = hora;
    this.pacienteId = pacienteId;
    }
}

module.exports = Turno;
