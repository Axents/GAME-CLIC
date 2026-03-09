import { useState } from 'react'
import './App.css'

import Login from './components/Login';
import CrearResena from './components/CrearResena';
import ListaResenas from './components/ListaResenas';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <h1>GAME & CLIC</h1>

      <button onClick={() => {
        localStorage.removeItem("token");
        setToken(null);
      }}> Cerrar sesion
      </button>

      <CrearResena />
      <ListaResenas />
    </div>
  );
}


export default App;