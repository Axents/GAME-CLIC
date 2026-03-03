const db = require("../config/db");

const user = {

    create: (data, callback) => {
        const sql = "insert into users (nombre_gamer, correo, password) values (?, ?, ?)";
        db.query(sql, [data.nombre_gamer, data.correo, data.password], callback);
    },

    buscarPorEmail: (correo, callback) => {
        const sql = "select * from users where correo = ?";
        db.query(sql, [correo], callback);
    }

};

module.exports = user;