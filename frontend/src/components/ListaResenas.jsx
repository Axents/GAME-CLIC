import { useEffect, useState } from "react";

function ListaResenas({ filtro, vista }){
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionado, setSeleccionado] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    setSeleccionado(null);
    setCargando(true);
    
    const url=vista === "biblioteca" 
      ? "http://localhost:3000/api/favoritos/mi-biblioteca" 
      : "http://localhost:3000/api/juegos"; 

    fetch(url, { headers: { "Authorization": localStorage.getItem("token") } })
      .then(res => res.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [vista]);

  const verDetalle=async(juego)=>{

    const juegoId = juego.id || juego.juego_id;
    setSeleccionado(juego);
    setComentarios([]); 
    
    try{
      const res = await fetch(`http://localhost:3000/api/resenas/juego/${juegoId}`);
      const data = await res.json();
      setComentarios(Array.isArray(data) ? data : []);
    }catch(error){
      console.error("Error cargando comentarios", error);
    }
  };

  const toggleFavorito = async (e, id) => {
    e.stopPropagation();
    const res = await fetch("http://localhost:3000/api/favoritos/agregar", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": localStorage.getItem("token") 
      },
      body: JSON.stringify({ juego_id: id })
    });
    
    if(res.ok){
      alert("Biblioteca actualizada");
    } else {
      console.error("error al agregar en favoritos");
    }
  };

  const filtrados = items.filter(i => (i.nombre || i.juego || "").toLowerCase().includes(filtro.toLowerCase()));
  const categorias = [...new Set(filtrados.map(i => i.genero || i.categoria || "General"))];

  if(cargando){
    return <div className="cargando">cargando</div>;
  }

  if(seleccionado){

    return(
      <div className="detale">
        <button className="REGRESAR" onClick={() => setSeleccionado(null)}>REGRESAR</button>

        <div className="layDetalle">
          <img src={seleccionado.imagen_url} alt="portada" className="pgrande" />
          <div className="info-detalle">
            <span className="tag-genero">{seleccionado.genero || seleccionado.categoria || "GAME"}</span>
            <h1>{seleccionado.nombre || seleccionado.juego}</h1>
            <p className="descripcion-texto">{seleccionado.descripcion || seleccionado.juego_descripcion}</p>
            <div className="footer-detalle">
              <button className="btn-biblioteca-pro" onClick={(e) => toggleFavorito(e, seleccionado.id || seleccionado.juego_id)}>
                AÑADIR A MI BIBLIOTECA
              </button>
            </div>
          </div>
        </div>
        <div className="zona-resenas">
          <h3>RESEÑAS DE LA COMUNIDAD ({comentarios.length})</h3>
          {comentarios.length > 0 ? (
            comentarios.map((c) => (
              <div key={c.id} className="card-comentario">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{c.nombre_gamer}</strong>
                  <span className="puntos-neon">{c.calificacion}/10</span>
                </div>
                <p>{c.contenido}</p>
              </div>
            ))
          ) : (
            <p className="text-secondary">este juego aun no tiene reseñas para mostrar</p>
          )}
        </div>
      </div>
    );
  }

  return(
    <main className="feed-principal">
      <h1 className="tituloSeccion">{vista === "biblioteca" ? "MI COLECCIÓN" : "CATÁLOGO GAMER"}</h1>
      {categorias.map(cat => (
        <section key={cat} className="seccion-categoria">
          <h2 className="titulo-cat">{cat}</h2>
          <div className="grid-juegos-cyber">
            {filtrados.filter(i => (i.genero || i.categoria || "General") === cat).map(item => (
              <article key={item.id || item.juego_id} className="tarjeta-cyber" onClick={() => verDetalle(item)}>
                <div className="img-wrap">
                  <img src={item.imagen_url} alt="portada" />
                  <div className="calif-tag">INFO</div>
                </div>
                <div className="cuerpo-tarjeta">
                  <h3>{item.nombre || item.juego}</h3>
                  <div className="footer-tarjeta">
                    <span> {item.total_resenas_juego || 0} reseñas</span>
                    <button className="heart-mini" onClick={(e) => toggleFavorito(e, item.id || item.juego_id)}>+</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default ListaResenas;