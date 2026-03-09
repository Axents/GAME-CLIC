const db = require("../config/conexionBD");

const Resena = {};
Resena.crear = (datos, callback) => {
    const sql = `insert into resenas (contenido, calificacion, usuario_id, juego_id)
    values (?, ?, ?, ?)`;

    db.query(sql, [datos.contenido,
    datos.calificacion, datos.usuario_id, datos.juego_id], callback
    );
};

Resena.obtenerTodas = (callback) => {
    const sql = `
    select resenas.*, users.nombre_gamer, juegos.nombre as juego
    from resenas
    join users on resenas.usuario_id = users.id
    join juegos on resenas.juego_id = juegos.id
    order by fecha desc
    `;

    db.query(sql, callback);
};

Resena.obtenerPorId = (id, callback) => {
    const sql = `select * from resenas where id = ?`;
    db.query(sql, [id], callback);
};
module.exports = Resena;
