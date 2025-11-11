import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './estilos/estilos.css';


// Proveedores de contexto
import { ProveedorAutenticacion } from './contexto/ContextoAutenticacion';
import { ProveedorEntrevista } from './contexto/ContextoEntrevista';

// Importar páginas
import PaginaPrincipal from './paginas/PaginaPrincipal';
import InicioSesion from './paginas/InicioSesion';
import CrearCuenta from './paginas/CrearCuenta';
import Lobby from './paginas/Lobby';
import Perfil from './paginas/Perfil';
import GenerarConIA from './paginas/GenerarConIA';
import PreguntasPersonalizadas from './paginas/PreguntasPersonalizadas';
import PantallaCarga from './paginas/PantallaCarga';
import EntrevistaEnCurso from './paginas/EntrevistaEnCurso';
import Resultados from './paginas/Resultados';
import Pago from './paginas/Pago';
import Historial from './paginas/Historial';

function App() {
  return (
    <ProveedorAutenticacion>
      <ProveedorEntrevista>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<PaginaPrincipal />} />
              <Route path="/inicio-sesion" element={<InicioSesion />} />
              <Route path="/crear-cuenta" element={<CrearCuenta />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/generar-con-ia" element={<GenerarConIA />} />
              <Route path="/preguntas-personalizadas" element={<PreguntasPersonalizadas />} />
              <Route path="/pantalla-carga" element={<PantallaCarga />} />
              <Route path="/entrevista" element={<EntrevistaEnCurso />} />
              <Route path="/resultados" element={<Resultados />} />
              <Route path="/pago" element={<Pago />} />
              <Route path="/historial" element={<Historial />} />
            </Routes>
          </div>
        </Router>
      </ProveedorEntrevista>
    </ProveedorAutenticacion>
  );
}

export default App;
