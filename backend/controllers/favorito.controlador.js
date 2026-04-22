const modeloFavorito=require("../models/favorito.modelo");
const db=require("../config/conexionBD");

exports.agregarFavorito=(req, res)=>{
    const datos={ 
        usuario_id: req.usuarioId,
        juego_id: parseInt(req.body.juego_id) 
    };
    
    modeloFavorito.agregar(datos, (err, result)=>{
        if(err){
            if(err.code==='ER_DUP_ENTRY'){
                return res.json({ message: "este juego ya se encuentra en tu biblioteca" });
            }
            return res.status(500).json({ error: err });
        }
        res.json({ message: "agregado a biblioteca permanentemente" });
    });
};

exports.obtenerBiblioteca=(req, res)=>{
    const sql = `
        select juegos.*, 
        (SELECT COUNT(*) FROM resenas WHERE juego_id = juegos.id) as total_resenas_juego 
        from favoritos 
        JOIN juegos ON favoritos.juego_id = juegos.id 
        WHERE favoritos.usuario_id = ?`;

    db.query(sql, [req.usuarioId], (err, resultados)=>{
        if (err) return res.status(500).json({ error: err });
        res.json(resultados);
    });
};