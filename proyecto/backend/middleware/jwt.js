// Este archivo contiene funciones para generar y verificar JWT
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

// Generar un token para un usuario
function generateToken(user) {
    return jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: '1h' });
}

// Middleware para verificar el token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }
    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};
