const personas = require("../models/persona.model");

const getPersonas = (req, res) => {
    res.json(personas);
};

module.exports = { getPersonas };