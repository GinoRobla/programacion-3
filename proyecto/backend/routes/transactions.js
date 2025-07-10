const express = require('express');
const router = express.Router();

const {
    obtenerTransacciones,
    registrarTransaccion,
    categorizarTransacciones,
    verBalance
} = require('../controllers/transactionsController');
const { verifyToken } = require('../middleware/jwt');


// Rutas protegidas con JWT
router.get('/', verifyToken, obtenerTransacciones);
router.post('/', verifyToken, registrarTransaccion);
router.get('/categorizar', verifyToken, categorizarTransacciones);
router.get('/balance', verifyToken, verBalance);

module.exports = router;
