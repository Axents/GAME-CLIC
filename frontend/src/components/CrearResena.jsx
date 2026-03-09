import { useState, useEffect } from "react";

function CrearResena() {

    const [juegos, setJuegos] = useState([]);
    const [juego_id, setJuegoId] = useState("");
    const [contenido, setContenido] = useState("");
    const [calificacion, setCalificacion] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/juegos").then(res => res.json()).then(data => setJuegos(data));
    }, []);

    const enviar = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:3000/api/resenas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                juego_id,
                contenido,
                calificacion
            })
        });

        alert("reseña publicada");
        window.location.reload();
    };

    return (
        <form onSubmit={enviar}>

            <h2>Nueva Reseña</h2>

            <label>Juego</label>

            <select
                value={juego_id}
                onChange={(e) => setJuegoId(e.target.value)}
            >

                <option value="">Selecciona un juego</option>

                {juegos.map(juego => (

                    <option key={juego.id} value={juego.id}>
                        {juego.nombre}
                    </option>

                ))}

            </select>
            <textarea
                placeholder="contenido"
                value={contenido}
                onChange={e => setContenido(e.target.value)}
            />
            <input
                placeholder="calificacion"
                value={calificacion}
                onChange={e => setCalificacion(e.target.value)}
            />
            <button>publicar</button>


        </form>

    );
}

export default CrearResena;