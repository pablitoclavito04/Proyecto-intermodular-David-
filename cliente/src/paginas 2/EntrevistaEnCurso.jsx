import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEntrevista } from '../contexto/ContextoEntrevista';
import { useAutenticacion } from '../contexto/ContextoAutenticacion';
import { evaluarEntrevista, textoAVoz } from '../servicios/servicioAPI';
import { reproducirAudio } from '../utilidades/utilidadesAudio';
import '../estilos/estilos.css';

const EntrevistaEnCurso = () => {
  const navigate = useNavigate();
  const { 
    entrevistaActual, 
    agregarPregunta, 
    agregarRespuesta, 
    finalizarEntrevista 
  } = useEntrevista();
  const { 
    estaAutenticado, 
    esPremium, 
    agregarEntrevistaAlHistorial 
  } = useAutenticacion();
  
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [grabando, setGrabando] = useState(false);
  const [transcripcion, setTranscripcion] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState(180); // 3 minutos por pregunta
  const [reproduciendo, setReproduciendo] = useState(false);
  const [procesando, setProcesando] = useState(false);
  
  const reconocimientoRef = useRef(null);
  const audioContextRef = useRef(null);

  // Verificar si hay entrevista en curso, si no, redirigir
  useEffect(() => {
    if (!entrevistaActual || entrevistaActual.completada) {
      navigate('/lobby');
      return;
    }

    // Reproducir la primera pregunta al iniciar
    reproducirPreguntaActual();
  }, []);

  const preguntas = entrevistaActual?.preguntas || [];
  const totalPreguntas = preguntas.length;
  const progreso = totalPreguntas > 0 ? ((preguntaActual + 1) / totalPreguntas) * 100 : 0;

  // Reproducir la pregunta actual usando TTS
  const reproducirPreguntaActual = async () => {
    if (!preguntas[preguntaActual]) return;
    
    setReproduciendo(true);
    try {
      const preguntaTexto = preguntas[preguntaActual].texto;
      agregarPregunta(preguntaTexto);
      
      // Llamar al API para texto a voz
      const audioBase64 = await textoAVoz(preguntaTexto);
      await reproducirAudio(audioBase64);
    } catch (error) {
      console.error('Error al reproducir pregunta:', error);
    } finally {
      setReproduciendo(false);
    }
  };

  // Inicializar reconocimiento de voz
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      reconocimientoRef.current = new SpeechRecognition();
      reconocimientoRef.current.continuous = true;
      reconocimientoRef.current.interimResults = true;
      reconocimientoRef.current.lang = 'es-ES';

      reconocimientoRef.current.onresult = (event) => {
        let transcripcionInterina = '';
        let transcripcionFinal = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            transcripcionFinal += transcript + ' ';
          } else {
            transcripcionInterina += transcript;
          }
        }

        setTranscripcion(prev => (prev + transcripcionFinal + transcripcionInterina).trim());
      };

      reconocimientoRef.current.onerror = (event) => {
        console.error('Error en reconocimiento de voz:', event.error);
        setGrabando(false);
      };
    }

    return () => {
      if (reconocimientoRef.current) {
        reconocimientoRef.current.stop();
      }
    };
  }, []);

  // Timer para tiempo restante
  useEffect(() => {
    if (tiempoRestante > 0 && !grabando) {
      const timer = setTimeout(() => setTiempoRestante(tiempoRestante - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tiempoRestante, grabando]);

  const toggleGrabacion = () => {
    if (!reconocimientoRef.current) {
      alert('Tu navegador no soporta reconocimiento de voz. Por favor, usa Chrome o Edge.');
      return;
    }

    if (!grabando) {
      // Iniciar grabación
      try {
        reconocimientoRef.current.start();
        setGrabando(true);
        setTranscripcion('');
        console.log('🎤 Grabación iniciada');
      } catch (error) {
        console.error('Error al iniciar grabación:', error);
      }
    } else {
      // Detener grabación
      try {
        reconocimientoRef.current.stop();
        setGrabando(false);
        console.log('⏸️ Grabación detenida');
      } catch (error) {
        console.error('Error al detener grabación:', error);
      }
    }
  };

  const siguientePregunta = async () => {
    // Si hay transcripción, guardar la respuesta
    if (transcripcion.trim()) {
      agregarRespuesta(transcripcion);
    }
    
    if (preguntaActual < totalPreguntas - 1) {
      // Siguiente pregunta
      setPreguntaActual(preguntaActual + 1);
      setTiempoRestante(180);
      setTranscripcion('');
      setGrabando(false);
      
      // Detener grabación si está activa
      if (grabando && reconocimientoRef.current) {
        try {
          reconocimientoRef.current.stop();
        } catch (error) {
          console.error('Error al detener grabación:', error);
        }
      }
      
      // Reproducir siguiente pregunta
      setTimeout(() => {
        reproducirPreguntaActual();
      }, 500);
    } else {
      // Finalizar entrevista y evaluar
      await finalizarYEvaluar();
    }
  };

  const finalizarYEvaluar = async () => {
    setProcesando(true);
    
    try {
      console.log('📊 Evaluando entrevista...');
      
      // Evaluar la entrevista
      const evaluacion = await evaluarEntrevista(entrevistaActual.transcripcion);
      
      // Finalizar entrevista y guardar resultados
      const entrevistaFinalizada = finalizarEntrevista(evaluacion);
      
      // Si el usuario está autenticado y es premium, guardar en historial
      if (estaAutenticado() && esPremium()) {
        agregarEntrevistaAlHistorial({
          id: entrevistaFinalizada.id,
          tema: entrevistaFinalizada.tema,
          fecha: entrevistaFinalizada.fechaFin,
          veredicto: evaluacion.veredicto,
          puntuacion: evaluacion.puntuacionGlobal,
          duracion: Math.floor((new Date(entrevistaFinalizada.fechaFin) - new Date(entrevistaFinalizada.fechaInicio)) / 1000 / 60),
          preguntas: entrevistaFinalizada.preguntas.length
        });
        console.log('✅ Entrevista guardada en historial (usuario premium)');
      } else if (estaAutenticado()) {
        console.log('ℹ️ Usuario gratuito - entrevista no guardada en historial');
      } else {
        console.log('ℹ️ Usuario anónimo - entrevista no guardada');
      }
      
      // Navegar a resultados
      navigate('/resultados');
    } catch (error) {
      console.error('Error al evaluar entrevista:', error);
      alert('Hubo un error al evaluar la entrevista. Redirigiendo a resultados con datos de ejemplo...');
      
      // Evaluación de ejemplo en caso de error
      const evaluacionEjemplo = {
        veredicto: 'APROBADO',
        puntuacionGlobal: 75,
        resumen: 'Evaluación realizada sin conexión al servidor.',
        feedbackDetallado: []
      };
      
      finalizarEntrevista(evaluacionEjemplo);
      navigate('/resultados');
    } finally {
      setProcesando(false);
    }
  };

  const salirEntrevista = () => {
    if (window.confirm('¿Estás seguro de que quieres salir? Perderás todo el progreso.')) {
      navigate('/lobby');
    }
  };

  const formatearTiempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${mins}:${segs.toString().padStart(2, '0')}`;
  };

  // Mostrar pantalla de carga mientras procesa
  if (procesando) {
    return (
      <div className="entrevista__procesando">
        <div>
          <div className="entrevista__procesando-icono">⏳</div>
          <h2 className="entrevista__procesando-titulo">
            Procesando tu entrevista...
          </h2>
          <p className="entrevista__procesando-descripcion">
            Evaluando tus respuestas y generando feedback personalizado
          </p>
          <div className="cargador__spinner entrevista__procesando-spinner"></div>
        </div>
      </div>
    );
  }

  if (!entrevistaActual) {
    return null;
  }

  return (
    <div className="entrevista">
      {/* Encabezado de la Entrevista */}
      <div className="entrevista__encabezado">
        <button className="boton boton--error boton--pequeno" onClick={salirEntrevista}>
          ✕ Salir
        </button>

        <div className="entrevista__progreso">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--espacio-sm)', fontSize: 'var(--fuente-sm)' }}>
            <span>Pregunta {preguntaActual + 1} de {totalPreguntas}</span>
            <span>{Math.round(progreso)}%</span>
          </div>
          <div className="barra-progreso">
            <div className="barra-progreso__relleno" style={{ width: `${progreso}%` }}></div>
          </div>
        </div>

        <div style={{ minWidth: '100px', textAlign: 'right' }}>
          <div style={{ fontSize: 'var(--fuente-sm)', marginBottom: 'var(--espacio-xs)' }}>
            Tiempo restante
          </div>
          <div style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', color: tiempoRestante < 60 ? 'var(--color-error)' : 'var(--texto-claro)' }}>
            {formatearTiempo(tiempoRestante)}
          </div>
        </div>
      </div>

      {/* Cuerpo de la Entrevista */}
      <div className="entrevista__cuerpo">
        <div style={{ fontSize: '4rem', marginBottom: 'var(--espacio-xl)' }}>
          {reproduciendo ? '🔊' : '🤖'}
        </div>

        <h2 className="entrevista__pregunta">
          {preguntas[preguntaActual]?.texto || 'Cargando pregunta...'}
        </h2>

        {reproduciendo && (
          <div style={{ 
            padding: 'var(--espacio-md)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderRadius: 'var(--radio-lg)',
            marginTop: 'var(--espacio-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--espacio-sm)',
            justifyContent: 'center'
          }}>
            <span>🔊 Reproduciendo pregunta...</span>
          </div>
        )}

        {/* Estado de Grabación */}
        {grabando && (
          <div style={{ 
            padding: 'var(--espacio-lg)',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radio-lg)',
            marginBottom: 'var(--espacio-xl)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--espacio-md)',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: 'var(--fuente-xl)' }}>🎤</span>
            <span style={{ fontSize: 'var(--fuente-lg)', fontWeight: '600' }}>
              Grabando tu respuesta...
            </span>
            <div className="cargador__spinner" style={{ width: '1.5rem', height: '1.5rem', borderWidth: '3px', borderTopColor: 'var(--texto-claro)' }}></div>
          </div>
        )}

        {/* Transcripción en Tiempo Real */}
        {grabando && transcripcion && (
          <div style={{
            padding: 'var(--espacio-lg)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radio-lg)',
            marginBottom: 'var(--espacio-xl)',
            maxWidth: '600px',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: 'var(--fuente-sm)', marginBottom: 'var(--espacio-sm)', opacity: 0.7 }}>
              Transcripción:
            </div>
            <p style={{ fontSize: 'var(--fuente-base)' }}>
              {transcripcion}
            </p>
          </div>
        )}

        {/* Controles */}
        <div className="entrevista__controles">
          <button 
            className={`boton-microfono ${grabando ? 'boton-microfono--activo' : ''}`}
            onClick={toggleGrabacion}
            title={grabando ? 'Detener grabación' : 'Iniciar grabación'}
          >
            {grabando ? '⏸️' : '🎤'}
          </button>
        </div>

        <p style={{ marginTop: 'var(--espacio-lg)', fontSize: 'var(--fuente-sm)', opacity: 0.8 }}>
          {grabando ? 'Haz clic en el micrófono para detener' : 'Haz clic en el micrófono para responder'}
        </p>

        {/* Botón Siguiente - Siempre visible */}
        <button 
          className="boton boton--exito boton--grande"
          onClick={siguientePregunta}
          style={{ marginTop: 'var(--espacio-xl)' }}
          disabled={grabando || reproduciendo}
        >
          {preguntaActual === totalPreguntas - 1 ? 'Finalizar Entrevista ✓' : 'Siguiente Pregunta →'}
        </button>

        {!transcripcion.trim() && (
          <p style={{ marginTop: 'var(--espacio-md)', fontSize: 'var(--fuente-sm)', color: 'var(--color-advertencia)', opacity: 0.9 }}>
            💡 Puedes saltar esta pregunta, pero es recomendable responder todas
          </p>
        )}
      </div>

      {/* Indicadores Inferiores */}
      <div style={{ 
        padding: 'var(--espacio-md)', 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--espacio-2xl)',
        fontSize: 'var(--fuente-sm)'
      }}>
        <div className="flex gap-sm" style={{ alignItems: 'center' }}>
          <span>🎯</span>
          <span>Entrevista en Progreso</span>
        </div>
        <div className="flex gap-sm" style={{ alignItems: 'center' }}>
          <span>🔊</span>
          <span>Audio Activado</span>
        </div>
        <div className="flex gap-sm" style={{ alignItems: 'center' }}>
          <span>💾</span>
          <span>Guardado Automático</span>
        </div>
      </div>
    </div>
  );
};

export default EntrevistaEnCurso;
