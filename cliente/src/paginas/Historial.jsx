import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contexto/ContextoAutenticacion';
import '../estilos/estilos.css';

const Historial = () => {
  const navigate = useNavigate();
  const { usuario, esPremium, cargando, cerrarSesion } = useAutenticacion();
  const [verificado, setVerificado] = useState(false);

  // Redirigir solo después de cargar el usuario desde localStorage
  useEffect(() => {
    if (cargando) {
      return; // Esperar a que termine de cargar
    }

    if (!usuario) {
      navigate('/inicio-sesion');
    } else if (!esPremium()) {
      navigate('/pago');
    } else {
      setVerificado(true);
    }
  }, [usuario, esPremium, navigate, cargando]);

  // Mostrar cargador mientras verifica
  if (cargando || !verificado) {
    return (
      <div className="pantalla-completa pantalla-completa--centrada">
        <div className="cargador">
          <div className="cargador__spinner"></div>
          <p className="cargador__texto">Cargando historial...</p>
        </div>
      </div>
    );
  }


  const historial = usuario.historialEntrevistas || [];

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const obtenerColorVeredicto = (veredicto) => {
    return veredicto === 'APROBADO' ? 'var(--color-exito)' : 'var(--color-error)';
  };

  const descargarPDF = (entrevista) => {
    // Aquí iría la lógica para generar y descargar el PDF
    console.log('Descargando PDF de entrevista:', entrevista.id);
    alert('Función de descarga de PDF en desarrollo');
  };

  return (
    <>
      {/* Encabezado */}
      <header className="encabezado">
        <div className="encabezado__contenedor">
          <div className="encabezado__logo">
            PrepáraT
          </div>
          <nav className="encabezado__nav">
            <Link to="/lobby" className="encabezado__enlace">
              Inicio
            </Link>
            <Link to="/perfil" className="encabezado__enlace">
              Mi Perfil
            </Link>
            <Link to="/historial" className="encabezado__enlace encabezado__enlace--activo">
              Historial
            </Link>
            <button
              onClick={() => {
                if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                  cerrarSesion();
                  navigate('/');
                }
              }}
              className="boton boton--secundario boton--pequeno"
            >
              Cerrar Sesión
            </button>
            <div className="avatar">
              <span>{usuario.nombre?.[0]?.toUpperCase() || 'U'}</span>
            </div>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main style={{ padding: 'var(--espacio-2xl) 0', minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-principal)' }}>
        <div className="contenedor">
          <div className="flex-entre" style={{ marginBottom: 'var(--espacio-2xl)', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
                Historial de Entrevistas
              </h1>
              <p style={{ color: 'var(--texto-secundario)' }}>
                Revisa y descarga tus entrevistas anteriores
              </p>
            </div>
            <div className="insignia insignia--primario">
              ⭐ Premium
            </div>
          </div>

          {historial.length === 0 ? (
            <div className="tarjeta" style={{ textAlign: 'center', padding: 'var(--espacio-2xl)' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--espacio-md)' }}>📋</div>
              <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                No tienes entrevistas aún
              </h2>
              <p style={{ color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-xl)' }}>
                Comienza tu primera entrevista para ver tu historial aquí
              </p>
              <Link to="/lobby" className="boton boton--primario boton--grande">
                Comenzar Entrevista
              </Link>
            </div>
          ) : (
            <div className="grid-tarjetas">
              {historial.map((entrevista) => (
                <div key={entrevista.id} className="tarjeta">
                  <div className="tarjeta__encabezado">
                    <div className="flex-entre">
                      <h3 className="tarjeta__titulo">{entrevista.tema || 'Entrevista'}</h3>
                      <span
                        className="insignia"
                        style={{
                          backgroundColor: entrevista.evaluacion?.veredicto === 'APROBADO'
                            ? 'var(--color-exito)'
                            : 'var(--color-error)'
                        }}
                      >
                        {entrevista.evaluacion?.veredicto || 'Pendiente'}
                      </span>
                    </div>
                    <p className="tarjeta__subtitulo">
                      {formatearFecha(entrevista.fecha)}
                    </p>
                  </div>

                  <div className="tarjeta__cuerpo">
                    <div style={{ display: 'flex', gap: 'var(--espacio-md)', marginBottom: 'var(--espacio-md)' }}>
                      <div>
                        <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>
                          Puntuación
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--fuente-2xl)',
                            fontWeight: '700',
                            color: obtenerColorVeredicto(entrevista.evaluacion?.veredicto)
                          }}
                        >
                          {entrevista.evaluacion?.puntuacionGlobal || 0}/100
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>
                          Preguntas
                        </div>
                        <div style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700' }}>
                          {entrevista.preguntas?.length || 0}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 'var(--fuente-xs)', color: 'var(--texto-secundario)' }}>
                          Tipo
                        </div>
                        <div style={{ fontSize: 'var(--fuente-lg)', fontWeight: '600' }}>
                          {entrevista.tipo === 'ai_generated' ? '🤖 IA' : '✏️ Personalizada'}
                        </div>
                      </div>
                    </div>

                    {entrevista.evaluacion?.resumen && (
                      <p style={{ color: 'var(--texto-secundario)', fontSize: 'var(--fuente-sm)' }}>
                        {entrevista.evaluacion.resumen.substring(0, 150)}
                        {entrevista.evaluacion.resumen.length > 150 ? '...' : ''}
                      </p>
                    )}
                  </div>

                  <div className="tarjeta__pie">
                    <button
                      onClick={() => navigate('/resultados', { state: { entrevista } })}
                      className="boton boton--secundario"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => descargarPDF(entrevista)}
                      className="boton boton--primario"
                    >
                      📥 Descargar PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Estadísticas */}
          {historial.length > 0 && (
            <section style={{ marginTop: 'var(--espacio-2xl)' }}>
              <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)' }}>
                Estadísticas Generales
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--espacio-lg)' }}>
                <div className="tarjeta" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-primario)', marginBottom: 'var(--espacio-sm)' }}>
                    {historial.length}
                  </div>
                  <div style={{ color: 'var(--texto-secundario)' }}>
                    Entrevistas Realizadas
                  </div>
                </div>

                <div className="tarjeta" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-exito)', marginBottom: 'var(--espacio-sm)' }}>
                    {historial.filter(e => e.evaluacion?.veredicto === 'APROBADO').length}
                  </div>
                  <div style={{ color: 'var(--texto-secundario)' }}>
                    Aprobadas
                  </div>
                </div>

                <div className="tarjeta" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-info)', marginBottom: 'var(--espacio-sm)' }}>
                    {historial.length > 0
                      ? Math.round(historial.reduce((acc, e) => acc + (e.evaluacion?.puntuacionGlobal || 0), 0) / historial.length)
                      : 0}
                  </div>
                  <div style={{ color: 'var(--texto-secundario)' }}>
                    Puntuación Media
                  </div>
                </div>

                <div className="tarjeta" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', color: 'var(--color-advertencia)', marginBottom: 'var(--espacio-sm)' }}>
                    {Math.round((historial.filter(e => e.evaluacion?.veredicto === 'APROBADO').length / historial.length) * 100)}%
                  </div>
                  <div style={{ color: 'var(--texto-secundario)' }}>
                    Tasa de Éxito
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default Historial;
