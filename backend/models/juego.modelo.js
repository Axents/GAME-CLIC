const db = require("../config/conexionBD");
const Juego = {};

Juego.obtenerTodos = (callback) =>{
    const sql = `
        SELECT juegos.*, 
        (SELECT COUNT(*) FROM resenas WHERE resenas.juego_id = juegos.id) as total_resenas_juego 
        FROM juegos
    `;
    db.query(sql, callback);
};

module.exports = Juego;