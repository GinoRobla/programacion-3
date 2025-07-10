// app.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json()); // Habilita el uso de JSON en las peticiones
app.use(morgan('dev')); // Muestra por consola las peticiones (GET, POST, etc.)

// Rutas
app.use('/api/transacciones', require('./routes/transactions'));
app.use('/api/auth', require('./routes/auth'));

// Puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});