import { useState } from "react";

function Login({ setToken }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre_gamer", data.nombre_gamer);
        setToken(data.token);
      } else {
        alert(data.message || "Error de acceso");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  return (
    <div className="af">
      <h2 className="tituloSeccion">ACCESO</h2>
      <form onSubmit={iniciarSesion}>
        <label className="etiquetaModerna">CORREO</label>
        <input
          type="email"
          className="i"
          placeholder="nombre@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <label className="etiquetaModerna">CONTRASEÑA</label>
        <input
          type="password"
          className="i"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="n">SINCRONIZAR</button>
      </form>
    </div>
  );
}

export default Login;