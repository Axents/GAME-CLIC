const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: process.env.host,
    user: process.env.usuario,
    password: process.env.contra,
    database: process.env.baseDeDatos
});

conexion.connect((err) => {
    if (err) {
        console.error("error con la base de datos", err);
        return;
    }
    console.log("conectado a mysql");
});

module.exports = conexion;