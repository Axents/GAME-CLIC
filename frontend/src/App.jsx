import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Registro from './components/Registro'
import CrearResena from './components/CrearResena'
import ListaResenas from './components/ListaResenas'
import logoImg from '../images/logo.jpg'

function App(){
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [esRegistro, setEsRegistro] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [vistaActual, setVistaActual] = useState("explorar");
  const [estadoUsuario, setEstadoUsuario] = useState("En línea");
  const [mostrarMenuEstado, setMostrarMenuEstado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState(localStorage.getItem("nombre_gamer") || "Usuario");
  const [fotoPerfil, setFotoPerfil] = useState(localStorage.getItem("foto_perfil") || "");

  useEffect(()=>{
    const usuario = localStorage.getItem("nombre_gamer");
    if(usuario){
      setNombreUsuario(usuario);
    }
    const foto=localStorage.getItem("foto_perfil");
    if(foto){
      setFotoPerfil(foto);
    }
  }, [token]);

  const cambiarFoto=()=>{
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload=()=>{
        localStorage.setItem("foto_perfil", reader.result);
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  if(!token){
    return(
      <div className="auth-wrapper">
        <div className="auth-container-wrapper">
          {esRegistro ? (
            <Registro irALogin={() => setEsRegistro(false)} />
          ) : (
            <>
              <Login setToken={setToken} />
              <p onClick={() => setEsRegistro(true)} className="enlaceAuth">¿Nuevo por aquí? Crea una cuenta</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="princi">
      <header className="navegadorArriba">
        <div className="navIzquierda">
          <img src={logoImg} alt="Logo" className="logoNav" />
          <nav className="enlacesNav">
            <a 
              href="#" 
              className={vistaActual === "explorar" ? "activo" : ""} 
              onClick={(e) => { e.preventDefault(); setVistaActual("explorar"); }}
            >
              EXPLORAR
            </a>
            <a 
              href="#" 
              className={vistaActual === "biblioteca" ? "activo" : ""} 
              onClick={(e) => { e.preventDefault(); setVistaActual("biblioteca"); }}
            >
              MI BIBLIOTECA
            </a>
        </nav>
        </div>
        <div className="navCentro">
          <input type="text" placeholder="Buscar videojuego" className="busquedaGlobal" value={terminoBusqueda} onChange={(e) => setTerminoBusqueda(e.target.value)} />
        </div>
        <div className="navDerecha">
          <div className="perfilMini">
            <div className="textoInfoUsuario">
              <span className="nombreUsuarioNav">{nombreUsuario}</span>
              <div className="selectorEstado" onClick={() => setMostrarMenuEstado(!mostrarMenuEstado)}>
                <span className={`puntoEstado ${estadoUsuario.replace(/\s/g, '').toLowerCase()}`}></span>
                {estadoUsuario} ▼
                {mostrarMenuEstado && (
                  <div className="menuEstados">
                    <div onClick={() => setEstadoUsuario("En línea")}>En linea</div>
                    <div onClick={() => setEstadoUsuario("Incógnito")}>Incognito</div>
                    <div onClick={() => setEstadoUsuario("Ausente")}>Ausente</div>
                  </div>
                )}
              </div>
            </div>
            <img src={fotoPerfil || `https://api.dicebear.com/7.x/bottts/svg?seed=${nombreUsuario}`} alt="avatar" className="avatarImg" onClick={cambiarFoto} title="Cambiar foto de perfil" />
          </div>
          <button className="botonSalir" onClick={() => { localStorage.clear(); window.location.reload(); }}>SALIR</button>
        </div>
      </header>
      <div className="cuadriculaContenido">
        <aside className="columnaIzquierda">
          <CrearResena />
        </aside>
        <main className="columnaDerecha">
          <ListaResenas filtro={terminoBusqueda} vista={vistaActual} />
        </main>
      </div>
    </div>
  );
}
export default App;