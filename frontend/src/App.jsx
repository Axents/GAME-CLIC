import { useState } from 'react'
import './App.css'
import Login from './components/Login';
import Registro from './components/Registro';
import CrearResena from './components/CrearResena';
import ListaResenas from './components/ListaResenas';
import logoImg from '../images/logo.jpg'

function App(){
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [esRegistro, setEsRegistro] = useState(false);

  if(!token){
    return(
      <div className="auth-wrapper">
        <div className="auth-container-wrapper">
          <img src={logoImg} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
          {esRegistro ? (
            <Registro irALogin={() => setEsRegistro(false)} />
          ) : (
            <>
              <Login setToken={setToken} />
              <p 
                onClick={() => setEsRegistro(true)} 
                style={{ cursor: 'pointer', color: '#66c0f4', marginTop: '15px', textDecoration: 'underline' }}
              >
                ¿No tienes cuenta? Regístrate aquí
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return(
    <div className="princi">
      <header className="navegadorArriba">
        <div className="navIzquierda">
          <img src={logoImg} alt="Logo" className="logoNav" />
          <nav className="enlacesNav">
            <a href="#" className="activo">EXPLORAR</a>
            <a href="#">COMUNIDAD</a>
            <a href="#">MI BIBLIOTECA</a>
          </nav>
        </div>

        <div className="navCentro">
          <div className="contenedorBusqueda">
            <input type="text" placeholder="Buscar juegos..." className="busquedaGlobal" />
          </div>
        </div>

        <div className="navDerecha">
          <div className="perfilMini">
            <div className="textoInfoUsuario">
              <span className="nombreUsuarioNav">Gamer_Pro</span>
              <span className="estadoOnline">En línea</span>
            </div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="avatarImg" />
          </div>
          <button className="botonSalir" onClick={() => {
            localStorage.removeItem("token");
            setToken(null);
          }}>SALIR</button>
        </div>
      </header>

      <div className="cuadriculaContenido">
        <aside className="columnaIzquierda">
          <CrearResena />
        </aside>
        <main className="columnaDerecha">
          <ListaResenas />
        </main>
      </div>
    </div>
  );
}

export default App;