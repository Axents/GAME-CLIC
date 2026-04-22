const express = require("express");
const router = express.Router();
const db = require("../config/conexionBD");
const auth = require("../middleware/autenticacion.middleware.js");
const controladorFavoritos = require("../controllers/favorito.controlador");

//error 404
router.post("/agregar", auth, controladorFavoritos.agregarFavorito);

// bibliotecq
router.get("/mi-biblioteca", auth, (req, res)=>{
    const sql = `
        SELECT juegos.*, 
        (SELECT COUNT(*) FROM resenas WHERE juego_id = juegos.id) as total_resenas_juego 
        FROM favoritos 
        JOIN juegos ON favoritos.juego_id = juegos.id 
        WHERE favoritos.usuario_id = ?`;
    
    db.query(sql, [req.usuarioId], (err, filas)=>{ 
        if (err) return res.status(500).json(err);
        res.json(filas);
    });
});

module.exports = router;