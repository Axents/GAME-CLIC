require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rutasUsuarios = require("./backend/routes/usuario.rutas");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", rutasUsuarios);

app.listen(process.env.puerto, () => {
    console.log(`Servidor en el puerto: ${process.env.puerto}`);
});