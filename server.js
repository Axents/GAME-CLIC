require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rutasUsuarios = require("./backend/routes/usuario.rutas");
const resenaRutas = require("./backend/routes/resena.rutas");
const rutasJuegos = require("./backend/routes/juego.rutas");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", rutasUsuarios);
app.use("/api/resenas", resenaRutas);
app.use("/api/juegos", rutasJuegos);

app.listen(process.env.puerto, () => {
    console.log(`Servidor en el puerto: ${process.env.puerto}`);
});