import { useEffect, useState } from "react";

function ListaResenas() {
    const [resenas, setResenas] = useState([]);

    useEffect(() => {

        fetch("http://localhost:3000/api/resenas").then(res => res.json()).then(data => setResenas(data));
    }, []);

    return (
        <div>
            <h2>reseñas</h2>
            {resenas.map(r => (
                <div key={r.id}>
                    <h3>{r.juego}</h3>
                    <p>{r.contenido}</p>
                    <p>{r.calificacion}</p>
                    <p>por {r.nombre_gamer}</p>
                </div>
            ))}
        </div>
    );
}
export default ListaResenas;