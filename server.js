require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rutasDeUsuario = require("./backend/routes/user.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", rutasDeUsuario);

app.listen(process.env.puerto, () => {
    console.log(`Servidor en el puerto: ${process.env.puerto}`);
});