import { useState } from "react";

function Login({ setToken }) {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const iniciarSesion = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/usuarios/login", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
        } else {
            alert(data.message);
        }
    };
    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={iniciarSesion}>
                <input
                    type="email"
                    placeholder="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Entrar</button>
            </form>
        </div>
    );
}
export default Login;