const User = require('../models/User');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
require('dotenv').config();

const seed = async () => {
    try {
        await connectDB(); // Conectar a la base de datos

        // Insertar usuario inicial
        const name = 'admin_name';
        const surname = 'admin_surname';
        const username = 'admin';
        const email = 'admin@gmail.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.findOne({ $or: [ { username }, { email } ] });
        if (!user) {
            user = await User.create({ name, surname, username, email, password: hashedPassword, initialBalance: 100000 });
            console.log('Usuario inicial creado: admin / admin123');
        } else {
            console.log('El usuario inicial ya existe');
        }

        // Insertar datos iniciales de transacciones en el usuario
        const iniciales = [
            {
                tipo: 'ingreso',
                monto: 3000000,
                categoria: 'Sueldo',
                descripcion: 'Sueldo mensual',
                fecha: new Date(),
            },
            {
                tipo: 'gasto',
                monto: 20000,
                categoria: 'Comida',
                descripcion: 'Compras del super',
                fecha: new Date(),
            },
            {
                tipo: 'gasto',
                monto: 5000,
                categoria: 'Transporte',
                descripcion: 'Colectivo',
                fecha: new Date(),
            },
            {
                tipo: 'ingreso',
                monto: 15000,
                categoria: 'Venta',
                descripcion: 'Venta de objeto usado',
                fecha: new Date(),
            },
            {
                tipo: 'gasto',
                monto: 12000,
                categoria: 'Servicios',
                descripcion: 'Pago de luz',
                fecha: new Date(),
            },
            {
                tipo: 'gasto',
                monto: 8000,
                categoria: 'Entretenimiento',
                descripcion: 'Cine',
                fecha: new Date(),
            },
            {
                tipo: 'ingreso',
                monto: 50000,
                categoria: 'Freelance',
                descripcion: 'Trabajo freelance',
                fecha: new Date(),
            },
            {
                tipo: 'gasto',
                monto: 3000,
                categoria: 'Regalos',
                descripcion: 'Regalo cumpleaños',
                fecha: new Date(),
            },
            {
                tipo: 'gasto',
                monto: 10000,
                categoria: 'Salud',
                descripcion: 'Compra de medicamentos',
                fecha: new Date(),
            },
            {
                tipo: 'ingreso',
                monto: 2000,
                categoria: 'Devolución',
                descripcion: 'Devolución de dinero',
                fecha: new Date(),
            }
        ];

        // Solo agregar si el usuario no tiene transacciones
        if (!user.transactions || user.transactions.length === 0) {
            user.transactions = iniciales;
            await user.save();
            console.log('Transacciones iniciales agregadas al usuario admin');
        } else {
            console.log('El usuario ya tiene transacciones');
        }

        console.log('Base de datos inicializada correctamente');
        process.exit();
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error.message);
        process.exit(1);
    }
};

seed();