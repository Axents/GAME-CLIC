const db = require("../config/conexionBD");

const Resena = {};

Resena.crear = (datos, callback) => {
    const sql = `INSERT INTO resenas (contenido, calificacion, usuario_id, juego_id, recomienda)
                 VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [datos.contenido, datos.calificacion, datos.usuario_id, datos.juego_id, datos.recomienda || 1], callback);
};

Resena.obtenerTodas=(callback)=>{
    const sql = `
        SELECT 
            resenas.*, 
            users.nombre_gamer, 
            juegos.nombre as juego, 
            juegos.imagen_url, 
            juegos.descripcion AS juego_descripcion,
            (SELECT COUNT(*) FROM resenas r2 WHERE r2.juego_id = resenas.juego_id) as total_resenas_juego
        FROM resenas
        JOIN users ON resenas.usuario_id = users.id
        JOIN juegos ON resenas.juego_id = juegos.id
        ORDER BY resenas.fecha DESC
    `;
    db.query(sql, callback);
};

module.exports = Resena;