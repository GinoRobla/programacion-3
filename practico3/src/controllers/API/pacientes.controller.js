const pacientesModel = require("./../../models/mock/pacientes.models.js");
const Paciente = require("./../../models/mock/entities/paciente.entity.js");

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
    const { dni, nombre, apellido, email } = req.body;

    const nuevoPaciente = new Paciente(dni, nombre, apellido, email);

    const info = await pacientesModel.create(nuevoPaciente);
    res.status(200).json(info);
  }
  async delete(req, res) {
    const id = req.params.id;

    const pacienteBorrado = await pacientesModel.delete(id)   ;
    pacienteBorrado.then(paciente=>{
        res.status(200).json(paciente);
    }).catch(
        error=>{
            res.status(404).json({message:`no existe el paciente conh el id:${id}`,error})}
        
    );
  
  }
  async update(req, res) {
    const id = req.params.id;
    const { dni, nombre, apellido, email } = req.body;
    const nuevoPaciente = new Paciente(dni, nombre, apellido, email);
    await pacientesModel.update(id, nuevoPaciente);
    res.status(200).json({ message: "actualizado" });
  }

  async findById(req, res) {
    const id = req.params.id;
    const paciente = await pacientesModel.getPacienteById(id);
    res.status(200).json(paciente);
  }

  async findByEmail(req, res) {
    const {email, password} = req.body;
    const paciente = await pacientesModel.findByEmail(email, password);
    res.status(200).json(paciente);
  }
}

module.exports = new PacientesController();