const express = require("express");
const router = express.Router();
const controladorUsuarios = require("../controllers/usuario.controlador");

router.post("/registrar", controladorUsuarios.registrar);
router.post("/login", controladorUsuarios.iniciarSesion);

module.exports = router;