import { useState } from "react";

function Registro({ irALogin }) {
  const [form, setForm] = useState({ nombre_gamer: "", correo: "", password: "" });

  const manejarRegistro = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/usuarios/registrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      alert("¡Registro exitoso! Iniciando protocolos de acceso.");
      irALogin();
    } else {
      alert("Error en el registro de datos.");
    }
  };

  return (
    <div className="af">
      <h2 className="tituloSeccion">CUENTA NUEVA</h2>
      <form onSubmit={manejarRegistro}>
        <label className="etiquetaModerna">GAMERTAG</label>
        <input
          type="text"
          className="i"
          placeholder="Nombre público"
          onChange={e => setForm({ ...form, nombre_gamer: e.target.value })}
          required
        />
        <label className="etiquetaModerna">CORREO ELECTRÓNICO</label>
        <input
          type="email"
          className="i"
          placeholder="usuario@correo.com"
          onChange={e => setForm({ ...form, correo: e.target.value })}
          required
        />
        <label className="etiquetaModerna">CONTRASEÑA</label>
        <input
          type="password"
          className="i"
          placeholder="••••••••"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="n">REGISTRARME</button>
      </form>
      <p onClick={irALogin} className="enlaceAuth">¿Ya tienes cuenta? Inicia sesión aquí</p>
    </div>
  );
}

export default Registro;