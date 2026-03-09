const express = require("express");
const router = express.Router();
const controlador = require("../controllers/resena.controlador");

router.post("/", controlador.crear);
router.get("/", controlador.obtenerTodas);
router.get("/:id", controlador.obtenerUna);



module.exports = router;