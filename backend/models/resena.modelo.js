const db=require("../config/conexionBD");

const Resena={};

Resena.crear=(datos, callback)=>{
    const sql=`insert into resenas(contenido, calificacion, usuario_id, juego_id) values (?, ?, ?, ?)`;
    db.query(sql, [datos.contenido, datos.calificacion, datos.usuario_id, datos.juego_id], callback);
};

Resena.obtenerTodas=(callback)=>{
    //datos de la reseña y del juego 
    const sql= `
        select 
            resenas.*, 
            users.nombre_gamer, 
            juegos.nombre as juego, 
            juegos.imagen_url, 
            juegos.descripcion AS juego_descripcion,
            (select count(*) from resenas r2 where r2.juego_id = resenas.juego_id) as total_resenas_juego
        from resenas
        join users on resenas.usuario_id = users.id
        join juegos on resenas.juego_id = juegos.id
        order by resenas.fecha desc
    `;
    db.query(sql, callback);
};

module.exports=Resena;