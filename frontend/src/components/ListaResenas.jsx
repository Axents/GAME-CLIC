import { useEffect, useState } from "react";

function ListaResenas(){
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(()=>{
    fetch("http://localhost:3000/api/resenas")
      .then(res => res.json())
      .then(data => {
        setResenas(data);
        setCargando(false);
      });
  }, []);

  if(cargando){
    return <div>cargando</div>;
  }

  return(
    <main className="contenedorFeed">
      <h1 className="tituloSeccion">ACTIVIDAD DE LA COMUNIDAD</h1>
      {resenas.map(r=>(
        <article key={r.id} className="tarjetaHorizontal">
          <div className="contenedorImagen">
            <img src={r.imagen_url} alt={r.juego} className="portadaJuego" />
          </div>
          <div className="infoResena">
            <h2 className="nombreJuego">{r.juego}</h2>
            <p style={{ color: 'var(--accent-cyan)' }}>Publicado por: {r.nombre_gamer}</p>
            <p>"{r.contenido}"</p>
            <div className="badgeScore">
              PUNTAJE: <span style={{ color: 'white' }}>{r.calificacion}/10</span>
            </div>
          </div>
        </article>
      ))}
    </main>
  );
}

export default ListaResenas;