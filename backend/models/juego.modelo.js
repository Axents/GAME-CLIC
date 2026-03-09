const db = require("../config/conexionBD");
const Juego = {};

Juego.obtenerTodos = (callback) => {
    const sql = "SELECT * FROM juegos";
    db.query(sql, callback);
};

module.exports = Juego;