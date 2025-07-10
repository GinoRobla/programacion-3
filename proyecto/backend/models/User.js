const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    initialBalance: {
        type: Number,
        default: 0
    },
    transactions: [
        {
            tipo: { type: String, enum: ['ingreso', 'gasto'], required: true },
            monto: { type: Number, required: true },
            categoria: { type: String, required: true },
            descripcion: { type: String, default: '' },
            fecha: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
