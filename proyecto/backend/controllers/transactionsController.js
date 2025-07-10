const User = require('../models/User');

// Obtener todas las transacciones, con opción de filtrar por fecha y categoría
const obtenerTransacciones = async (req, res) => {
    try {
        const { desde, hasta, categoria } = req.query; // Obtener parámetros de consulta
        const user = await User.findById(req.user.id); // Buscar el usuario por ID
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); 
        let transacciones = user.transactions || []; // guardar transacciones del usuario, si no hay, usar un array vacío

        // Filtrar por rango de fechas si se proveen
        if (desde || hasta) {
            transacciones = transacciones.filter(tx => {
                const fecha = new Date(tx.fecha);
                let ok = true;
                if (desde) ok = ok && fecha >= new Date(desde);
                if (hasta) ok = ok && fecha <= new Date(hasta);
                return ok;
            });
        }

        // Filtrar por categoría si se provee
        if (categoria) {
            transacciones = transacciones.filter(tx => tx.categoria === categoria);
        }

        // Ordenar por fecha descendente
        transacciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        res.json(transacciones);
    } catch (error) {
        console.error('Error al obtener transacciones:', error.message);
        res.status(500).json({ error: 'Error al obtener transacciones' });
    }
};

// Crear una nueva transacción
const registrarTransaccion = async (req, res) => {
    const { tipo, monto, categoria, descripcion } = req.body; // obtener los datos de la transacción
    try {
        const user = await User.findById(req.user.id); // Buscar el usuario por ID
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); // Verificar si el usuario existe
        const nuevaTransaccion = {
            tipo,
            monto,
            categoria,
            descripcion,
            fecha: new Date()
        }; // crear la nueva transacción
        user.transactions.push(nuevaTransaccion); // agregar la transacción al array de transacciones del usuario
        await user.save(); // guardar los cambios en la base de datos
        res.status(201).json(nuevaTransaccion); // responder con la nueva transacción creada
    } catch (error) {
        console.error('Error al registrar transacción:', error.message);
        res.status(500).json({ error: 'Error al registrar transacción' });
    }
};

// Categorizar transacciones (versión principiante)
const categorizarTransacciones = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Crear un array para guardar las categorías únicas
        const categorias = [];

        // Recorrer todas las transacciones del usuario
        for (let i = 0; i < user.transactions.length; i++) {
            const cat = user.transactions[i].categoria;
            // Si la categoría no está en el array, la agrego
            if (categorias.indexOf(cat) === -1) {
                categorias.push(cat);
            }
        }

        // Armar el resultado como array de objetos { categoria }
        const resultado = [];
        for (let i = 0; i < categorias.length; i++) {
            resultado.push({ categoria: categorias[i] });
        }

        res.json(resultado);
    } catch (error) {
        console.error('Error al categorizar transacciones:', error.message);
        res.status(500).json({ error: 'Error al categorizar transacciones' });
    }
};

// Calcular balance
const verBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Buscar el usuario por ID
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); // Verificar si el usuario existe
        let balance = user.initialBalance; // Iniciar balance con el balance inicial del usuario
        for (const tx of user.transactions) { // Recorrer las transacciones del usuario
            if (tx.tipo === 'ingreso') balance += tx.monto; // Si es ingreso, sumar al balance
            else if (tx.tipo === 'gasto') balance -= tx.monto; // Si es gasto, restar del balance
        }
        res.json({ balance });
    } catch (error) {
        console.error('Error al calcular balance:', error.message);
        res.status(500).json({ error: 'Error al calcular balance' });
    }
};

// Exportar las funciones del controlador
module.exports = {
    obtenerTransacciones,
    registrarTransaccion,
    categorizarTransacciones,
    verBalance
};