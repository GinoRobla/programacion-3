const pacientesModel = require("./../../models/mock/pacientes.models.js");
const Paciente = require("./../../models/mock/entities/paciente.entity.js");
const pacienteSchema = require("../../validations/pacientes.validation.js");

class PacientesController {
  async login(req, res) {
    //recolecto credenciales
    try {
      const { email, password } = req.body;

      const token = await pacientesModel.validate(email, password);
    
      res.status(200).json(token);
    
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async list(req, res) {
    res.status(200).json(await pacientesModel.list());
  }

  async create(req, res) {
    const { error } = pacienteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Error! algun dato no cumplio con los requisitos" });
    }

    const { dni, nombre, apellido, email, password } = req.body;
    const nuevoPaciente = new Paciente(dni, nombre, apellido, email, password);

    const info = await pacientesModel.create(nuevoPaciente);
    res.status(200).json(info);
  }


  delete(req, res) {
    const id = req.params.id;

    pacientesModel.delete(id);

    res.status(200).json({ message: "eliminado" });
  }


  update(req, res) {
    const id = req.params.id;
    
    const { error } = pacienteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "Error! algun dato no cumplio con los requisitos" });
    }

    const { dni, nombre, apellido, email, password} = req.body;

    const nuevoPaciente = new Paciente(dni, nombre, apellido, email, password);

    pacientesModel.update(id, nuevoPaciente);

    res.status(200).json({ message: "actualizado" });
  }
}

module.exports = new PacientesController();
