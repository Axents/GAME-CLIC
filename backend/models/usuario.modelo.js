const conexionBD = require("../config/conexionBD");

const modeloUsuario = {

    crearUsuario: (data, callback) => {
        const sql = "insert into users (nombre_gamer, correo, password) values (?, ?, ?)";
        conexionBD.query(sql, [data.nombre_gamer, data.correo, data.password], callback);
    },

    buscarPorCorreo: (correo, callback) => {
        const sql = "select * from users where correo = ?";
        conexionBD.query(sql, [correo], callback);
    }

};

module.exports = modeloUsuario;