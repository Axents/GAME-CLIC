import { useState, useEffect } from "react";

function CrearResena(){
  const [juegos, setJuegos] = useState([]);
  const [juego_id, setJuegoId] = useState("");
  const [contenido, setContenido] = useState("");
  const [calificacion, setCalificacion] = useState(10);

  useEffect(()=>{
    fetch("http://localhost:3000/api/juegos")
      .then(res => res.json())
      .then(data => setJuegos(data));
  }, []);

  const enviar=async (e) =>{
    e.preventDefault();
    if(!juego_id){
      return alert("Selecciona un titulo");
    }

    const res = await fetch("http://localhost:3000/api/resenas",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ 
        juego_id: parseInt(juego_id), 
        contenido, 
        calificacion: parseInt(calificacion) 
      })
    });

    if(res.ok){
      alert("¡Reseña publicada!");
      window.location.reload();
    }
  };

  return(
    <div className="panelAccion">
      <h2 className="tituloSeccion">NUEVA RESEÑA</h2>
      <form onSubmit={enviar}>
        <div className="bloqueEntrada">
          <label className="etiquetaModerna">VIDEOJUEGOS</label>
          <select className="selectorModerno" value={juego_id} onChange={(e) => setJuegoId(e.target.value)} required>

            <option value="">elegir juego</option>
            {juegos.map(j => <option key={j.id} value={j.id}>{j.nombre}</option>)}
          </select>
        </div>

        <div className="bloqueEntrada">
          <label className="etiquetaModerna">PUNTUACION: <span className="puntos-neon">{calificacion}/10</span></label>
          <input 
            type="range" 
            min="1" max="10" 
            className="slider-puntos"
            value={calificacion} 
            onChange={(e) => setCalificacion(e.target.value)} 
          />
        </div>

        <div className="bloqueEntrada">
          <label className="etiquetaModerna">ANÁLISIS</label>
          <textarea 
            className="textoAreaModerno" 
            placeholder="Deja tu opinion y/o experiencia con este juego " 
            value={contenido} 
            onChange={e => setContenido(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="botonDesplegar">PUBLICAR RESEÑA</button>
      </form>
    </div>
  );
}
export default CrearResena;