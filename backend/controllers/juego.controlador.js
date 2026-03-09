const Juego = require("../models/juego.modelo");

exports.obtenerTodos = (req, res) => {

    Juego.obtenerTodos((err, resultados) => {

        if (err) return res.status(500).json(err);

        res.json(resultados);

    });

};