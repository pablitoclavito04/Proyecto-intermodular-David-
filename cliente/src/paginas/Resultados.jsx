import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAutenticacion } from '../contexto/ContextoAutenticacion';
import { useEntrevista } from '../contexto/ContextoEntrevista';
import '../estilos/estilos.css';

const Resultados = () => {
  const navigate = useNavigate();
  const { usuario, estaAutenticado, esPremium } = useAutenticacion();
  const { resultados, obtenerResumenBasico } = useEntrevista();
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);

  // Datos de ejemplo mientras se implementa la API real
  const resultadosEjemplo = {
    evaluacion: {
      veredicto: 'APROBADO',
      puntuacionGlobal: 85,
      resumen: 'Has demostrado un buen dominio de los conceptos fundamentales y capacidad de comunicación clara.',
      feedbackDetallado: [
        {
          pregunta: '¿Cuéntame sobre tu experiencia con React?',
          respuesta: 'He trabajado con React durante 2 años, desarrollando aplicaciones con hooks, context API y React Router.',
          feedback: 'Excelente respuesta. Demuestras experiencia práctica y conocimiento de las herramientas actuales del ecosistema React.',
          respuestaIdeal: 'Una respuesta ideal incluiría años de experiencia, proyectos específicos, tecnologías relacionadas (hooks, Redux, etc.) y resultados tangibles.'
        },
        {
          pregunta: '¿Cómo manejas el estado en aplicaciones grandes?',
          respuesta: 'Utilizo Context API para estado global simple y Redux para aplicaciones más complejas con muchas interacciones.',
          feedback: 'Muy bien. Conoces las diferentes opciones y sabes cuándo aplicar cada una según la complejidad del proyecto.',
          respuestaIdeal: 'Mencionar Context API, Redux, Zustand o similar, explicar criterios de selección y buenas prácticas de arquitectura.'
        },
        {
          pregunta: '¿Qué es el Virtual DOM?',
          respuesta: 'Es una representación en memoria del DOM real que React usa para optimizar las actualizaciones.',
          feedback: 'Correcto, pero podrías profundizar más en cómo funciona el proceso de reconciliación.',
          respuestaIdeal: 'Explicar que es una copia ligera del DOM, el proceso de diffing, reconciliación y cómo React minimiza las manipulaciones del DOM real.'
        }
      ]
    },
    entrevista: {
      tema: 'Desarrollador Frontend React',
      tipo: 'ai_generated',
      fechaInicio: new Date(Date.now() - 1200000).toISOString(),
      fechaFin: new Date().toISOString(),
      preguntas: [
        { texto: '¿Cuéntame sobre tu experiencia con React?' },
        { texto: '¿Cómo manejas el estado en aplicaciones grandes?' },
        { texto: '¿Qué es el Virtual DOM?' }
      ]
    }
  };

  const datosResultados = resultados || resultadosEjemplo;
  const evaluacion = datosResultados.evaluacion;
  const entrevista = datosResultados.entrevista;

  useEffect(() => {
    // Si no hay resultados ni de ejemplo, redirigir al inicio
    if (!resultados && !resultadosEjemplo) {
      navigate('/');
    }
  }, [resultados, navigate]);

  const handleDescargarResultados = () => {
    // Si no está autenticado, mostrar modal para login
    if (!estaAutenticado()) {
      setMostrarModalLogin(true);
      return;
    }

    // Si es gratuito y no aprobó, redirigir a pago
    if (!esPremium() && evaluacion.veredicto === 'NO_APROBADO') {
      navigate('/pago');
      return;
    }

    // Si es premium, redirigir al historial donde están todas las entrevistas
    if (esPremium()) {
      console.log('✅ Usuario premium - redirigiendo al historial');
      navigate('/historial');
      return;
    }

    // Si es gratuito y aprobó, no necesita pagar
    alert('Como aprobaste, puedes continuar gratis. Si quieres el análisis detallado y acceso al historial, actualiza a Premium.');
  };

  const handleVerAnalisisDetallado = () => {
    if (!estaAutenticado()) {
      setMostrarModalLogin(true);
      return;
    }

    if (!esPremium()) {
      navigate('/pago');
      return;
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calcularDuracion = () => {
    if (entrevista.fechaInicio && entrevista.fechaFin) {
      const inicio = new Date(entrevista.fechaInicio);
      const fin = new Date(entrevista.fechaFin);
      const diferencia = Math.floor((fin - inicio) / 1000 / 60); // minutos
      return `${diferencia} minutos`;
    }
    return 'N/A';
  };


  const aprobado = evaluacion.veredicto === 'APROBADO';
  const puedeVerAnalisisDetallado = esPremium();

  return (
    <>
      {/* Modal de Login */}
      {mostrarModalLogin && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="tarjeta" style={{ maxWidth: '500px', margin: 'var(--espacio-md)' }}>
            <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
              Inicia Sesión para Descargar
            </h2>
            <p style={{ color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-xl)' }}>
              Para descargar tus resultados y acceder al análisis completo, necesitas iniciar sesión o crear una cuenta.
            </p>
            <div style={{ display: 'flex', gap: 'var(--espacio-md)', flexWrap: 'wrap' }}>
              <Link to="/inicio-sesion" className="boton boton--primario" style={{ flex: 1 }}>
                Iniciar Sesión
              </Link>
              <Link to="/crear-cuenta" className="boton boton--secundario" style={{ flex: 1 }}>
                Crear Cuenta
              </Link>
            </div>
            <button
              onClick={() => setMostrarModalLogin(false)}
              className="boton boton--outline boton--completo"
              style={{ marginTop: 'var(--espacio-md)' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      <header className="encabezado">
        <div className="encabezado__contenedor">
          <div className="encabezado__logo">
            PrepáraT
          </div>
          <nav className="encabezado__nav">
            <Link to={estaAutenticado() ? "/lobby" : "/"} className="boton boton--secundario">
              {estaAutenticado() ? 'Volver al Lobby' : 'Volver al Inicio'}
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="resultados">
        <div className="contenedor">
          {/* Encabezado de Resultados */}
          <div className="resultados__encabezado">
            <div className="resultados__estado">
              <span style={{ fontSize: '4rem' }}>
                {aprobado ? '✅' : '❌'}
              </span>
              <span style={{ color: aprobado ? 'var(--color-exito)' : 'var(--color-error)' }}>
                {aprobado ? '¡Aprobado!' : 'No Aprobado'}
              </span>
            </div>
            
            <div className="resultados__puntuacion">
              {evaluacion.puntuacionGlobal}/100
            </div>
            
            <p style={{ fontSize: 'var(--fuente-lg)', color: 'var(--texto-secundario)', marginTop: 'var(--espacio-md)', maxWidth: '600px', margin: '0 auto' }}>
              {evaluacion.resumen}
            </p>

            <div style={{ 
              display: 'flex', 
              gap: 'var(--espacio-md)', 
              justifyContent: 'center', 
              marginTop: 'var(--espacio-lg)',
              fontSize: 'var(--fuente-sm)',
              color: 'var(--texto-secundario)',
              flexWrap: 'wrap'
            }}>
              <span>📅 {formatearFecha(entrevista.fechaFin)}</span>
              <span>⏱️ {calcularDuracion()}</span>
              <span>❓ {entrevista.preguntas.length} preguntas</span>
            </div>
          </div>

          {/* Métricas Generales (Siempre visibles - Gratis) */}
          <section className="resultados__contenido">
            <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
              Resumen de tu Entrevista
            </h2>
            
            <div className="tarjeta">
              <div style={{ marginBottom: 'var(--espacio-lg)' }}>
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '600', marginBottom: 'var(--espacio-sm)' }}>
                  Tema: {entrevista.tema}
                </h3>
                <p style={{ color: 'var(--texto-secundario)' }}>
                  Tipo: {entrevista.tipo === 'ai_generated' ? '🤖 Generada por IA' : '✏️ Personalizada'}
                </p>
              </div>

              <div style={{ 
                padding: 'var(--espacio-lg)', 
                backgroundColor: 'var(--bg-principal)', 
                borderRadius: 'var(--radio-md)',
                borderLeft: `4px solid ${aprobado ? 'var(--color-exito)' : 'var(--color-error)'}`
              }}>
                <p style={{ fontSize: 'var(--fuente-lg)' }}>
                  <strong>Veredicto:</strong> {evaluacion.veredicto}
                </p>
                <p style={{ fontSize: 'var(--fuente-lg)', marginTop: 'var(--espacio-sm)' }}>
                  <strong>Puntuación:</strong> {evaluacion.puntuacionGlobal}/100
                </p>
              </div>
            </div>
          </section>

          {/* CTA para Análisis Detallado (Si no es premium) */}
          {!puedeVerAnalisisDetallado && (
            <section style={{ marginTop: 'var(--espacio-2xl)' }}>
              <div className="tarjeta" style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'var(--texto-claro)',
                textAlign: 'center',
                padding: 'var(--espacio-2xl)'
              }}>
                <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                  🎯 Desbloquea el Análisis Detallado
                </h2>
                <p style={{ fontSize: 'var(--fuente-lg)', marginBottom: 'var(--espacio-lg)', opacity: 0.9 }}>
                  Obtén feedback específico por cada pregunta, identifica tus fortalezas y áreas de mejora con recomendaciones personalizadas
                </p>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--espacio-md)',
                  marginBottom: 'var(--espacio-xl)',
                  textAlign: 'left'
                }}>
                  <div>
                    <strong>✓ Análisis pregunta por pregunta</strong>
                  </div>
                  <div>
                    <strong>✓ Feedback específico</strong>
                  </div>
                  <div>
                    <strong>✓ Respuestas ideales</strong>
                  </div>
                  <div>
                    <strong>✓ Descarga en PDF</strong>
                  </div>
                  <div>
                    <strong>✓ Historial completo</strong>
                  </div>
                  <div>
                    <strong>✓ Seguimiento de progreso</strong>
                  </div>
                </div>

                <div style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                  9.99€
                </div>

                <button 
                  className="boton boton--secundario boton--grande"
                  onClick={handleVerAnalisisDetallado}
                  style={{ minWidth: '250px' }}
                >
                  Obtener Análisis Premium
                </button>
              </div>
            </section>
          )}

          {/* Análisis Detallado (Premium - Solo si pagó o aprobó) */}
          {puedeVerAnalisisDetallado && evaluacion.feedbackDetallado && (
            <>
              <section style={{ marginTop: 'var(--espacio-2xl)' }}>
                <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)' }}>
                  � Análisis Detallado por Pregunta
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-lg)' }}>
                  {evaluacion.feedbackDetallado.map((item, indice) => (
                    <div key={indice} className="tarjeta">
                      <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)', color: 'var(--color-primario)' }}>
                        Pregunta {indice + 1}: {item.pregunta}
                      </h3>
                      
                      <div style={{ marginBottom: 'var(--espacio-md)', padding: 'var(--espacio-md)', backgroundColor: 'var(--bg-principal)', borderRadius: 'var(--radio-sm)' }}>
                        <strong style={{ color: 'var(--texto-secundario)', fontSize: 'var(--fuente-sm)' }}>Tu respuesta:</strong>
                        <p style={{ marginTop: 'var(--espacio-xs)' }}>{item.respuesta}</p>
                      </div>

                      <div style={{ marginBottom: 'var(--espacio-md)', padding: 'var(--espacio-md)', backgroundColor: 'var(--bg-info)', borderRadius: 'var(--radio-sm)', borderLeft: '4px solid var(--color-info)' }}>
                        <strong style={{ color: 'var(--color-info)' }}>💡 Feedback:</strong>
                        <p style={{ marginTop: 'var(--espacio-xs)' }}>{item.feedback}</p>
                      </div>

                      <div style={{ padding: 'var(--espacio-md)', backgroundColor: 'var(--bg-exito)', borderRadius: 'var(--radio-sm)', borderLeft: '4px solid var(--color-exito)' }}>
                        <strong style={{ color: 'var(--color-exito)' }}>⭐ Respuesta Ideal:</strong>
                        <p style={{ marginTop: 'var(--espacio-xs)' }}>{item.respuestaIdeal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Acciones Finales */}
          <section style={{ marginTop: 'var(--espacio-2xl)', display: 'flex', justifyContent: 'center', gap: 'var(--espacio-lg)', flexWrap: 'wrap' }}>
            <Link 
              to={estaAutenticado() ? "/lobby" : "/"} 
              className="boton boton--primario boton--grande"
            >
              {estaAutenticado() ? 'Nueva Entrevista' : 'Ir al Inicio'}
            </Link>
            
            <button 
              className="boton boton--secundario boton--grande"
              onClick={handleDescargarResultados}
            >
              {esPremium() ? '� Ver en Historial' : '�📥 Descargar Resultados'}
            </button>

            {estaAutenticado() && esPremium() && (
              <Link to="/historial" className="boton boton--outline boton--grande">
                📋 Todas mis Entrevistas
              </Link>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Resultados;
