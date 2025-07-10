const mongoose = require('mongoose');
//conexion a la base de datos 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { //la URI de la conexion esta en archivo .env para no exponerla
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); // si falla la conexion, se detiene el proceso
    }
};

module.exports = connectDB; // exportamos la funcion para poder usarla en otros archivos