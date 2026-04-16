import { useState } from "react";

function Registro({ irALogin }){
    const [form, setForm] = useState({ nombre_gamer: "", correo: "", password: "" });

    const manejarRegistro = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/usuarios/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
            alert("Registro correcto, ahora inicia sesion");
            irALogin();
        } else {
            alert(data.error || "error al registrar");
        }
    };

    return(
        <div className="auth-container">
            <h2>Crear Cuenta Gamer</h2>
            <form onSubmit={manejarRegistro}>
                <input type="text" placeholder="Nombre Gamer" onChange={e => setForm({...form, nombre_gamer: e.target.value})} required />
                <input type="email" placeholder="Correo" onChange={e => setForm({...form, correo: e.target.value})} required />
                <input type="password" placeholder="Contraseña" onChange={e => setForm({...form, password: e.target.value})} required />
                <button type="submit">Registrarme</button>
            </form>
            <p onClick={irALogin} style={{cursor:'pointer', color:'#646cff'}}>¿Ya tienes cuenta? Inicia sesion</p>
        </div>
    );
}

export default Registro;