const Resena = require("../models/resena.modelo");
const jwt = require("jsonwebtoken");

exports.crear = (req, res) => {
    const token = req.headers.authorization;

    console.log("TOKEN RECIBIDO:", token);
    if (!token) {
        return res.status(401).json({
            mensaje: "token requerido"
        });
    }
    const decoded = jwt.verify(token, process.env.jwt_clave);

    console.log("TOKEN DECODIFICADO:", decoded);
    console.log("BODY RECIBIDO:", req.body);
    const datos = {
        contenido: req.body.contenido,
        calificacion: req.body.calificacion,
        usuario_id: decoded.id,
        juego_id: req.body.juego_id
    };
    Resena.crear(datos, (err, resultado) => {

        if (err) {
            console.log("ERROR MYSQL:", err);
            return res.status(500).json(err);
        }

        res.json({
            mensaje: "reseña creada",
            id: resultado.insertId
        });

    });
};

exports.obtenerTodas = (req, res) => {
    Resena.obtenerTodas((err, resultados) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(resultados);
    });
};

exports.obtenerUna = (req, res) => {
    const id = req.params.id;
    Resena.obtenerPorId(id, (err, resultados) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(resultados[0]);
    });
};