import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../estilos/estilos.css';

const Lobby = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Encabezado */}
      <header className="encabezado">
        <div className="encabezado__contenedor">
          <div className="encabezado__logo">
            PrepáraT
          </div>
          <nav className="encabezado__nav">
            <Link to="/lobby" className="encabezado__enlace encabezado__enlace--activo">
              Inicio
            </Link>
            <Link to="/perfil" className="encabezado__enlace">
              Mi Perfil
            </Link>
            <Link to="/historial" className="encabezado__enlace">
              Historial
            </Link>
            <div className="avatar">
              <span>U</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="lobby">
        <div className="contenedor">
          <h1 className="lobby__titulo">
            ¡Bienvenido de nuevo! 👋
          </h1>
          <p className="lobby__subtitulo">
            Elige cómo quieres preparar tu próxima entrevista
          </p>

          <div className="lobby__opciones">
            {/* Opción 1: Generar con IA */}
            <div className="opcion-entrevista" onClick={() => navigate('/generar-con-ia')}>
              <div className="opcion-entrevista__icono">
                🤖
              </div>
              <h2 className="opcion-entrevista__titulo">
                Generar con IA
              </h2>
              <p className="opcion-entrevista__descripcion">
                Nuestra IA generará preguntas personalizadas basadas en el puesto y la industria que elijas. Perfecto para una preparación completa y realista.
              </p>
              <button className="boton boton--primario boton--grande boton--completo">
                Comenzar
              </button>
            </div>

            {/* Opción 2: Preguntas Personalizadas */}
            <div className="opcion-entrevista" onClick={() => navigate('/preguntas-personalizadas')}>
              <div className="opcion-entrevista__icono">
                ✏️
              </div>
              <h2 className="opcion-entrevista__titulo">
                Preguntas Personalizadas
              </h2>
              <p className="opcion-entrevista__descripcion">
                Crea tu propia lista de preguntas específicas para practicar exactamente lo que necesitas. Ideal para preparar temas concretos.
              </p>
              <button className="boton boton--primario boton--grande boton--completo">
                Crear Preguntas
              </button>
            </div>
          </div>

          {/* Sección de Entrevistas Recientes */}
          <section style={{ marginTop: 'var(--espacio-2xl)' }}>
            <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)' }}>
              Tus Entrevistas Recientes
            </h2>
            
            <div className="grid-tarjetas">
              {/* Tarjeta de ejemplo 1 */}
              <div className="tarjeta">
                <div className="tarjeta__encabezado">
                  <div className="flex-entre">
                    <h3 className="tarjeta__titulo">Desarrollador Frontend</h3>
                    <span className="insignia insignia--exito">Aprobado</span>
                  </div>
                  <p className="tarjeta__subtitulo">Hace 2 días</p>
                </div>
                <div className="tarjeta__cuerpo">
                  <p style={{ color: 'var(--texto-secundario)' }}>
                    Entrevista generada por IA con 10 preguntas sobre React, JavaScript y CSS.
                  </p>
                  <div style={{ marginTop: 'var(--espacio-md)', display: 'flex', gap: 'var(--espacio-md)' }}>
                    <div>
                      <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>Puntuación</div>
                      <div style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', color: 'var(--color-exito)' }}>85/100</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>Duración</div>
                      <div style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700' }}>18 min</div>
                    </div>
                  </div>
                </div>
                <div className="tarjeta__pie">
                  <button className="boton boton--secundario">Ver Detalles</button>
                  <button className="boton boton--primario">Repetir</button>
                </div>
              </div>

              {/* Tarjeta de ejemplo 2 */}
              <div className="tarjeta">
                <div className="tarjeta__encabezado">
                  <div className="flex-entre">
                    <h3 className="tarjeta__titulo">Preguntas Personalizadas</h3>
                    <span className="insignia insignia--advertencia">Mejorable</span>
                  </div>
                  <p className="tarjeta__subtitulo">Hace 1 semana</p>
                </div>
                <div className="tarjeta__cuerpo">
                  <p style={{ color: 'var(--texto-secundario)' }}>
                    Práctica personalizada con preguntas sobre Node.js y bases de datos.
                  </p>
                  <div style={{ marginTop: 'var(--espacio-md)', display: 'flex', gap: 'var(--espacio-md)' }}>
                    <div>
                      <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>Puntuación</div>
                      <div style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', color: 'var(--color-advertencia)' }}>68/100</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>Duración</div>
                      <div style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700' }}>22 min</div>
                    </div>
                  </div>
                </div>
                <div className="tarjeta__pie">
                  <button className="boton boton--secundario">Ver Detalles</button>
                  <button className="boton boton--primario">Repetir</button>
                </div>
              </div>

              {/* Tarjeta de ejemplo 3 */}
              <div className="tarjeta">
                <div className="tarjeta__encabezado">
                  <div className="flex-entre">
                    <h3 className="tarjeta__titulo">Product Manager</h3>
                    <span className="insignia insignia--error">No Aprobado</span>
                  </div>
                  <p className="tarjeta__subtitulo">Hace 2 semanas</p>
                </div>
                <div className="tarjeta__cuerpo">
                  <p style={{ color: 'var(--texto-secundario)' }}>
                    Entrevista generada por IA sobre gestión de productos y metodologías ágiles.
                  </p>
                  <div style={{ marginTop: 'var(--espacio-md)', display: 'flex', gap: 'var(--espacio-md)' }}>
                    <div>
                      <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>Puntuación</div>
                      <div style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', color: 'var(--color-error)' }}>52/100</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>Duración</div>
                      <div style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700' }}>15 min</div>
                    </div>
                  </div>
                </div>
                <div className="tarjeta__pie">
                  <button className="boton boton--primario">Ver Análisis</button>
                </div>
              </div>
            </div>
          </section>

          {/* Estadísticas Rápidas */}
          <section style={{ marginTop: 'var(--espacio-2xl)' }}>
            <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)' }}>
              Tu Progreso
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--espacio-lg)' }}>
              <div className="tarjeta" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-primario)', marginBottom: 'var(--espacio-sm)' }}>
                  12
                </div>
                <div style={{ color: 'var(--texto-secundario)' }}>
                  Entrevistas Completadas
                </div>
              </div>

              <div className="tarjeta" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-exito)', marginBottom: 'var(--espacio-sm)' }}>
                  75%
                </div>
                <div style={{ color: 'var(--texto-secundario)' }}>
                  Tasa de Éxito
                </div>
              </div>

              <div className="tarjeta" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-info)', marginBottom: 'var(--espacio-sm)' }}>
                  4.2
                </div>
                <div style={{ color: 'var(--texto-secundario)' }}>
                  Puntuación Media
                </div>
              </div>

              <div className="tarjeta" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-advertencia)', marginBottom: 'var(--espacio-sm)' }}>
                  3h 24m
                </div>
                <div style={{ color: 'var(--texto-secundario)' }}>
                  Tiempo Practicado
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Lobby;
