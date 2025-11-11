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

    // Si es premium, puede descargar siempre
    if (esPremium()) {
      console.log('✅ Usuario premium - Descargando resultados');
      // Aquí iría la lógica real de descarga de PDF
      alert('Descargando PDF de resultados... (Funcionalidad en desarrollo)');
      return;
    }

    // Si es gratuito y aprobó, puede descargar
    if (evaluacion.veredicto === 'APROBADO') {
      console.log('✅ Usuario gratuito aprobado - Descargando resultados básicos');
      alert('Descargando resultados básicos... Como aprobaste, puedes descargar gratis. ¡Actualiza a Premium para análisis detallado!');
      return;
    }

    // Si es gratuito y no aprobó, necesita premium
    navigate('/pago');
  };

  const handleVerAnalisisDetallado = () => {
    if (!estaAutenticado()) {
      setMostrarModalLogin(true);
      return;
    }

    if (!esPremium()) {
      navigate('/pago');
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
        <div className="resultados-modal">
          <div className="resultados-modal__contenido tarjeta">
            <h2 className="resultados-modal__titulo">
              Inicia Sesión para Descargar
            </h2>
            <p className="resultados-modal__texto">
              Para descargar tus resultados y acceder al análisis completo, necesitas iniciar sesión o crear una cuenta.
            </p>
            <div className="resultados-modal__acciones">
              <Link to="/inicio-sesion" className="boton boton--primario resultados-modal__accion">
                Iniciar Sesión
              </Link>
              <Link to="/crear-cuenta" className="boton boton--secundario resultados-modal__accion">
                Crear Cuenta
              </Link>
            </div>
            <button
              onClick={() => setMostrarModalLogin(false)}
              className="boton boton--outline boton--completo resultados-modal__cerrar"
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
              <span className="resultados__estado-emoji">
                {aprobado ? '✅' : '❌'}
              </span>
              <span className={`resultados__estado-texto ${aprobado ? 'resultados__estado-texto--aprobado' : 'resultados__estado-texto--no-aprobado'}`}>
                {aprobado ? '¡Aprobado!' : 'No Aprobado'}
              </span>
            </div>
            
            <div className="resultados__puntuacion">
              {evaluacion.puntuacionGlobal}/100
            </div>
            
            <p className="resultados__resumen">
              {evaluacion.resumen}
            </p>

            <div className="resultados__meta">
              <span>📅 {formatearFecha(entrevista.fechaFin)}</span>
              <span>⏱️ {calcularDuracion()}</span>
              <span>❓ {entrevista.preguntas.length} preguntas</span>
            </div>
          </div>

          {/* Métricas Generales (Siempre visibles - Gratis) */}
          <section className="resultados__contenido">
            <h2 className="resultados__titulo">
              Resumen de tu Entrevista
            </h2>
            
            <div className="tarjeta">
              <div className="resultados__tema">
                <h3 className="resultados__tema-titulo">
                  Tema: {entrevista.tema}
                </h3>
                <p className="resultados__tema-tipo">
                  Tipo: {entrevista.tipo === 'ai_generated' ? '🤖 Generada por IA' : '✏️ Personalizada'}
                </p>
              </div>

              <div className={`resultados__veredicto ${aprobado ? 'resultados__veredicto--aprobado' : 'resultados__veredicto--no-aprobado'}`}>
                <p className="resultados__veredicto-linea">
                  <strong>Veredicto:</strong> {evaluacion.veredicto}
                </p>
                <p className="resultados__veredicto-linea">
                  <strong>Puntuación:</strong> {evaluacion.puntuacionGlobal}/100
                </p>
              </div>
            </div>
          </section>

          {/* CTA para Análisis Detallado (Si no es premium) */}
          {!puedeVerAnalisisDetallado && (
            <section className="resultados__premium">
              <div className="resultados__premium-card tarjeta">
                <h2 className="resultados__premium-titulo">
                  🎯 Desbloquea el Análisis Detallado
                </h2>
                <p className="resultados__premium-descripcion">
                  Obtén feedback específico por cada pregunta, identifica tus fortalezas y áreas de mejora con recomendaciones personalizadas
                </p>
                
                <div className="resultados__premium-features">
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

                <div className="resultados__premium-precio">
                  9.99€
                </div>

                <button 
                  className="boton boton--secundario boton--grande resultados__premium-boton"
                  onClick={handleVerAnalisisDetallado}
                >
                  Obtener Análisis Premium
                </button>
              </div>
            </section>
          )}

          {/* Análisis Detallado (Premium - Solo si pagó o aprobó) */}
          {puedeVerAnalisisDetallado && evaluacion.feedbackDetallado && (
            <>
              <section className="resultados__analisis">
                <h2 className="resultados__titulo">
                  📊 Análisis Detallado por Pregunta
                </h2>
                
                <div className="resultados__analisis-lista">
                  {evaluacion.feedbackDetallado.map((item, indice) => (
                    <div key={indice} className="tarjeta resultados__pregunta">
                      <h3 className="resultados__pregunta-titulo">
                        Pregunta {indice + 1}: {item.pregunta}
                      </h3>
                      
                      <div className="resultados__respuesta">
                        <strong className="resultados__respuesta-label">Tu respuesta:</strong>
                        <p className="resultados__respuesta-texto">{item.respuesta}</p>
                      </div>

                      <div className="resultados__feedback">
                        <strong className="resultados__feedback-label">💡 Feedback:</strong>
                        <p className="resultados__feedback-texto">{item.feedback}</p>
                      </div>

                      <div className="resultados__ideal">
                        <strong className="resultados__ideal-label">⭐ Respuesta Ideal:</strong>
                        <p className="resultados__ideal-texto">{item.respuestaIdeal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Acciones Finales */}
          <section className="resultados__acciones">
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
              {esPremium() ? '📊 Ver en Historial' : '📥 Descargar Resultados'}
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
