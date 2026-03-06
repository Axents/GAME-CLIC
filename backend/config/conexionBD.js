const mysql = require("mysql2");

const conexionBD = mysql.createConnection({
    host: process.env.host,
    user: process.env.usuario,
    password: process.env.contra,
    database: process.env.baseDeDatos
});

conexionBD.connect((err) => {
    if (err) {
        console.error("error en la bd", err);
        return;
    }
    console.log("conectado a mysql");
});

module.exports = conexionBD;