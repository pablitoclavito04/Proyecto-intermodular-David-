import React from 'react';
import '../../estilos/estilos.css';

const Encabezado = ({ usuario, paginaActual = '' }) => {
  return (
    <header className="encabezado">
      <div className="encabezado__contenedor">
        <a href="/" className="encabezado__logo">
          PrepáraT
        </a>
        
        <nav className="encabezado__nav">
          {usuario ? (
            // Usuario autenticado
            <>
              <a 
                href="/lobby" 
                className={`encabezado__enlace ${paginaActual === 'lobby' ? 'encabezado__enlace--activo' : ''}`}
              >
                Inicio
              </a>
              <a 
                href="/perfil" 
                className={`encabezado__enlace ${paginaActual === 'perfil' ? 'encabezado__enlace--activo' : ''}`}
              >
                Mi Perfil
              </a>
              <a 
                href="/historial" 
                className={`encabezado__enlace ${paginaActual === 'historial' ? 'encabezado__enlace--activo' : ''}`}
              >
                Historial
              </a>
              <div className="avatar">
                <span>{usuario.nombre?.charAt(0) || 'U'}</span>
              </div>
            </>
          ) : (
            // Usuario no autenticado
            <>
              <a href="/#funcionalidades" className="encabezado__enlace">
                Funcionalidades
              </a>
              <a href="/#como-funciona" className="encabezado__enlace">
                Cómo Funciona
              </a>
              <a href="/#precios" className="encabezado__enlace">
                Precios
              </a>
              <a href="/inicio-sesion" className="boton boton--outline">
                Iniciar Sesión
              </a>
              <a href="/crear-cuenta" className="boton boton--primario">
                Comenzar Gratis
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Encabezado;
