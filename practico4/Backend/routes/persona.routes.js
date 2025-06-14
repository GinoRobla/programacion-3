const express = require("express");
const router = express.Router();

const {getPersonas}  = require("../controllers/persona.controller");

router.get("/personas", getPersonas);

module.exports = router;