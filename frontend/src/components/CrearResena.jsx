import { useState, useEffect } from "react";

function CrearResena(){
  const [juegos, setJuegos]=useState([]);
  const [juego_id, setJuegoId]= useState("");
  const [contenido, setContenido]= useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [recomienda, setRecomienda] = useState(true);

  useEffect(()=>{
    fetch("http://localhost:3000/api/juegos")
      .then(res => res.json())
      .then(data => setJuegos(data));
  },[]);

  const enviar=async (e)=>{
    e.preventDefault();

    if(!juego_id){
        return alert("Selecciona un juego");
    }

    const res=await fetch("http://localhost:3000/api/resenas",{
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
    if (res.ok) window.location.reload();
  };

  return(
    <div className="panelAccion">
      <h2 className="tituloSeccion">NUEVA OPINION</h2>
      <form onSubmit={enviar}>
        <div className="bloqueEntrada">
          <label className="etiquetaModerna">VIDEOJUEGOS</label>
          <select className="selectorModerno" value={juego_id} onChange={(e)=>setJuegoId(e.target.value)} required>
            <option value="">Biblioteca</option>
            {juegos.map(j=><option key={j.id} value={j.id}>{j.nombre}</option>)}
          </select>
        </div>

        <div className="bloqueEntrada">
          <label className="etiquetaModerna">Opinion Final</label>
          <div className="veredictoCaja">
            <div className={`opcionVeredicto positivo ${recomienda ? 'seleccionado' : ''}`} onClick={() => setRecomienda(true)}>
              <div className="icono">logo pendiente</div>
              <span>RECOMENDADO</span>
            </div>
            <div className={`opcionVeredicto negativo ${!recomienda ? 'seleccionado' : ''}`} onClick={() => setRecomienda(false)}>
              <div className="icono">logo pendiente</div>
              <span>EVITAR</span>
            </div>
          </div>
        </div>

        <div className="bloqueEntrada">
          <label className="etiquetaModerna">Puntuacion: {calificacion}</label>
          <div className="nodosPuntaje">
            {[...Array(10)].map((_, i) => (
              <div key={i + 1} className={`nodoScore ${calificacion == i + 1 ? 'activo' : ''}`} onClick={() => setCalificacion(i + 1)}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="bloqueEntrada">
          <label className="etiquetaModerna">Reseña</label>
          <textarea className="textoAreaModerno" placeholder="Escribe tu opinion" value={contenido} onChange={e => setContenido(e.target.value)} />
        </div>

        <button className="botonDesplegar">Hacer publica mi opinion</button>
      </form>
    </div>
  );
}

export default CrearResena;