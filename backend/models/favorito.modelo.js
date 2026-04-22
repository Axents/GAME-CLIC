const db=require("../config/conexionBD");

const Favorito={};

Favorito.agregar=(datos,callback) =>{
    const sql=`INSERT IGNORE INTO favoritos (usuario_id,juego_id) VALUES (?,?)`;
    db.query(sql,[datos.usuario_id,datos.juego_id],callback);
};

Favorito.obtenerPorUsuario=(usuario_id,callback)=>{
    const sql=`
        SELECT juegos.* FROM favoritos 
        JOIN juegos ON favoritos.juego_id=juegos.id 
        WHERE favoritos.usuario_id=?`;
    db.query(sql,[usuario_id],callback);
};

Favorito.eliminar=(datos,callback)=>{
    const sql=`DELETE FROM favoritos WHERE usuario_id=? AND juego_id=?`;
    db.query(sql,[datos.usuario_id,datos.juego_id],callback);
};

module.exports=Favorito;