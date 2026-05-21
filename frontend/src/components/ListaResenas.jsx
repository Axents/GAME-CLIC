import { useEffect, useState } from "react";

function ListaResenas({ filtro, vista }) {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionado, setSeleccionado] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    setSeleccionado(null);
    setCargando(true);

    const url = vista === "biblioteca" 
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

  const verDetalle = async (juego) => {
    const juegoId = juego.id || juego.juego_id;
    setSeleccionado(juego);
    setComentarios([]); 

    try {
      const res = await fetch(`http://localhost:3000/api/resenas/juego/${juegoId}`);
      const data = await res.json();
      setComentarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener las reseñas:", error);
    }
  };

  const toggleFavorito = async (e, juegoId) => {
    e.stopPropagation(); // Evita que se abra la vista de detalle al dar clic al botón '+'
    try {
      const res = await fetch("http://localhost:3000/api/favoritos/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ juego_id: juegoId })
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Error de conexión al agregar a biblioteca");
    }
  };

  // Filtrar los videojuegos según la barra de búsqueda global
  const filtrados = items.filter(i => {
    const nombre = (i.nombre || i.juego || "").toLowerCase();
    return nombre.includes((filtro || "").toLowerCase());
  });

  // Agrupar dinámicamente por categorías/géneros existentes
  const categorias = [...new Set(filtrados.map(i => i.genero || i.categoria || "General"))];

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--accent-cyan)', fontWeight: 'bold', letterSpacing: '2px' }}>
        INICIALIZANDO CATÁLOGO...
      </div>
    );
  }

  // VISTA 1: DETALLE DE UN VIDEOJUEGO SELECCIONADO
  if (seleccionado) {
    return (
      <div className="detale">
        <button className="REGRESAR" onClick={() => setSeleccionado(null)}>
          ← REGRESAR AL FEED
        </button>

        <div className="layDetalle">
          <img 
            className="pgrande" 
            src={seleccionado.imagen_url} 
            alt={seleccionado.nombre || seleccionado.juego} 
          />
          <div className="info-detalle">
            <span className="tag-genero">{seleccionado.genero || seleccionado.categoria || "Videojuego"}</span>
            <h1>{seleccionado.nombre || seleccionado.juego}</h1>
            <p className="descripcion-texto">{seleccionado.descripcion || seleccionado.juego_descripcion || "Sin descripción disponible por el momento."}</p>
            
            {vista !== "biblioteca" && (
              <button 
                className="btn-biblioteca-pro" 
                onClick={(e) => toggleFavorito(e, seleccionado.id || seleccionado.juego_id)}
              >
                + AÑADIR A MI BIBLIOTECA
              </button>
            )}
          </div>
        </div>

        {/* APARTADO DE RESEÑAS DE CADA USUARIO */}
        <div className="zona-resenas">
          <h3 style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Reseñas de la Comunidad ({comentarios.length})
          </h3>
          
          {comentarios.length > 0 ? (
            comentarios.map((c) => (
              <div key={c.id} className="card-comentario" style={{ animation: 'slideIn 0.3s ease-out' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Render dinámico de otros usuarios con avatares únicos */}
                    <img 
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${c.nombre_gamer}`} 
                      alt={`Avatar de ${c.nombre_gamer}`} 
                      style={{ 
                        width: '35px', 
                        height: '35px', 
                        background: '#090c14', 
                        borderRadius: '50%', 
                        border: '2px solid var(--accent-neon)',
                        padding: '2px'
                      }} 
                    />
                    <strong style={{ fontSize: '0.95rem', color: '#fff', letterSpacing: '0.5px' }}>
                      {c.nombre_gamer}
                    </strong>
                  </div>
                  <span className="puntos-neon" style={{ fontWeight: '800' }}>
                    {c.calificacion}/10
                  </span>
                </div>
                <p style={{ marginTop: '12px', paddingLeft: '47px', color: 'var(--text-secondary)' }}>
                  {c.contenido}
                </p>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', paddingLeft: '5px' }}>
              Este juego aún no tiene análisis. ¡Sé el primero en escribir uno a la izquierda!
            </p>
          )}
        </div>
      </div>
    );
  }

  // VISTA 2: CATÁLOGO GENERAL AGRUPADO POR CATEGORÍAS
  return (
    <main className="feed-principal">
      <h1 className="tituloSeccion" style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px' }}>
        {vista === "biblioteca" ? "🕹️ MI BIBLIOTECA PERSONAL" : "🚀 EXPLORAR VIDEOJUEGOS"}
      </h1>

      {filtrados.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', marginTop: '20px' }}>No se encontraron títulos que coincidan con tu búsqueda.</p>
      ) : (
        categorias.map(cat => (
          <section key={cat} className="seccion-categoria" style={{ marginBottom: '40px' }}>
            <h2 className="titulo-cat">{cat}</h2>
            <div className="grid-juegos-cyber">
              {filtrados
                .filter(i => (i.genero || i.categoria || "General") === cat)
                .map(item => {
                  const idActual = item.id || item.juego_id;
                  return (
                    <article key={idActual} className="tarjeta-cyber" onClick={() => verDetalle(item)}>
                      <div className="img-wrap">
                        <img src={item.imagen_url} alt={item.nombre || item.juego} loading="lazy" />
                        <div className="calif-tag">ANÁLISIS</div>
                      </div>
                      <div className="cuerpo-tarjeta">
                        <h3>{item.nombre || item.juego}</h3>
                        <div className="footer-tarjeta">
                          <span>
                            💬 {item.total_resenas_juego || 0} {item.total_resenas_juego === 1 ? "reseña" : "reseñas"}
                          </span>
                          {vista !== "biblioteca" && (
                            <button className="heart-mini" onClick={(e) => toggleFavorito(e, idActual)} title="Agregar a mi biblioteca">
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

export default ListaResenas;