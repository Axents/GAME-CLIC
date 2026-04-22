const Resena = require("../models/resena.modelo");
const jwt = require("jsonwebtoken");
const db = require("../config/conexionBD");

exports.crear=(req, res)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({ mensaje: "token requerido" });
    }

    try{
        const decoded = jwt.verify(token, process.env.jwt_clave);
        const datos = {
            contenido: req.body.contenido,
            calificacion: req.body.calificacion,
            usuario_id: decoded.id,
            juego_id: req.body.juego_id,
            recomienda: req.body.recomienda || 1
        };
        Resena.crear(datos, (err, resultado)=>{
            if(err){
                return res.status(500).json(err);
            }
            res.json({ mensaje: "reseña creada", id: resultado.insertId });
        });
    }catch(e){
        res.status(401).json({ mensaje: "Token inválido" });
    }
};

exports.obtenerPorJuego =(req, res)=>{
    const idJuego=req.params.id; 
    const sql = `
        SELECT resenas.*, users.nombre_gamer 
        FROM resenas 
        JOIN users ON resenas.usuario_id = users.id 
        WHERE resenas.juego_id = ?
        ORDER BY resenas.fecha DESC
    `;
    db.query(sql, [idJuego], (err, resultados) =>{
        if (err) return res.status(500).json(err);
        res.json(resultados);
    });
};

exports.obtenerTodas = (req, res)=>{
    Resena.obtenerTodas((err, resultados)=>{
        if (err) return res.status(500).json(err);
        res.json(resultados);
    });
};