const express = require("express");
const router = express.Router();

const controlador = require("../controllers/juego.controlador");

router.get("/", controlador.obtenerTodos);

module.exports = router;