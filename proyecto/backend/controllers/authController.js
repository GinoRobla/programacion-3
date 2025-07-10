const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../middleware/jwt');

// Controlador para registrar usuario
const register = async (req, res) => {
    const { username, password, name, surname, email, initialBalance } = req.body; // obtener los datos del formulario
    try {
        // Verificar si el username o el email ya existen, y retornar error si es así
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ error: 'El usuario o email ya existe' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // hashear la contraseña
        user = new User({ username, password: hashedPassword, name, surname, email, initialBalance }); // crear un nuevo usuario
        await user.save(); // guardar el usuario en la base de datos
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el registro' });
    }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
    const { username, password } = req.body; // obtener los datos del formulario
    try {
        const user = await User.findOne({ username }); // buscar el usuario por username
        if (!user) {
            return res.status(400).json({ error: 'Usuario o contraseña incorrectos' }); // si no existe el usuario, retornar error
        }
        const isMatch = await bcrypt.compare(password, user.password); // comparar la contraseña ingresada con la almacenada
        if (!isMatch) {
            return res.status(400).json({ error: 'Usuario o contraseña incorrectos' }); // si no coinciden, retornar error
        }
        // Generar token JWT
        const token = generateToken(user);
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // buscar el usuario por ID y excluir el campo de contraseña
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); 
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

// Exportar los controladores para usarlos en las rutas
module.exports = { 
    register,
    login,
    me
};