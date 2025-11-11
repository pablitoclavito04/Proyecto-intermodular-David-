/**
 * Contexto de Entrevista
 * Gestiona el estado de la entrevista actual
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ContextoEntrevista = createContext();

export const ProveedorEntrevista = ({ children }) => {
  const [entrevistaActual, setEntrevistaActual] = useState(null);
  const [resultados, setResultados] = useState(null);

  // Cargar entrevista desde localStorage si existe
  useEffect(() => {
    const entrevistaGuardada = localStorage.getItem('entrevistaActual');
    if (entrevistaGuardada) {
      try {
        setEntrevistaActual(JSON.parse(entrevistaGuardada));
      } catch (error) {
        console.error('Error al cargar entrevista:', error);
        localStorage.removeItem('entrevistaActual');
      }
    }
  }, []);

  // Guardar entrevista en localStorage cuando cambie
  useEffect(() => {
    if (entrevistaActual) {
      localStorage.setItem('entrevistaActual', JSON.stringify(entrevistaActual));
    } else {
      localStorage.removeItem('entrevistaActual');
    }
  }, [entrevistaActual]);

  /**
   * Iniciar una nueva entrevista
   */
  const iniciarEntrevista = (configuracion) => {
    const nuevaEntrevista = {
      id: Date.now().toString(),
      tipo: configuracion.tipo, // 'ai_generated' o 'user_defined'
      tema: configuracion.tema,
      preguntas: configuracion.preguntas || [],
      respuestas: [],
      transcripcion: [],
      fechaInicio: new Date().toISOString(),
      completada: false
    };

    setEntrevistaActual(nuevaEntrevista);
    setResultados(null);
    return nuevaEntrevista;
  };

  /**
   * Agregar una pregunta a la transcripción
   */
  const agregarPregunta = (pregunta) => {
    if (!entrevistaActual) return;

    const transcripcionActualizada = [
      ...entrevistaActual.transcripcion,
      { hablante: 'IA', texto: pregunta }
    ];

    setEntrevistaActual({
      ...entrevistaActual,
      transcripcion: transcripcionActualizada
    });
  };

  /**
   * Agregar una respuesta a la transcripción
   */
  const agregarRespuesta = (respuesta) => {
    if (!entrevistaActual) return;

    const transcripcionActualizada = [
      ...entrevistaActual.transcripcion,
      { hablante: 'Usuario', texto: respuesta }
    ];

    const respuestasActualizadas = [
      ...entrevistaActual.respuestas,
      respuesta
    ];

    setEntrevistaActual({
      ...entrevistaActual,
      transcripcion: transcripcionActualizada,
      respuestas: respuestasActualizadas
    });
  };

  /**
   * Finalizar la entrevista y guardar resultados
   */
  const finalizarEntrevista = (evaluacion) => {
    if (!entrevistaActual) return;

    const entrevistaFinalizada = {
      ...entrevistaActual,
      completada: true,
      fechaFin: new Date().toISOString(),
      evaluacion: evaluacion
    };

    setEntrevistaActual(entrevistaFinalizada);
    setResultados({
      entrevista: entrevistaFinalizada,
      evaluacion: evaluacion
    });

    return entrevistaFinalizada;
  };

  /**
   * Limpiar la entrevista actual
   */
  const limpiarEntrevista = () => {
    setEntrevistaActual(null);
    setResultados(null);
    localStorage.removeItem('entrevistaActual');
  };

  /**
   * Obtener resumen básico (para usuarios gratuitos)
   */
  const obtenerResumenBasico = () => {
    if (!resultados) return null;

    return {
      veredicto: resultados.evaluacion.veredicto,
      puntuacion: resultados.evaluacion.puntuacionGlobal,
      aprobado: resultados.evaluacion.veredicto === 'APROBADO'
    };
  };

  /**
   * Verificar si hay una entrevista en curso
   */
  const hayEntrevistaEnCurso = () => {
    return entrevistaActual !== null && !entrevistaActual.completada;
  };

  /**
   * Verificar si hay resultados disponibles
   */
  const hayResultados = () => {
    return resultados !== null;
  };

  const valor = {
    entrevistaActual,
    resultados,
    iniciarEntrevista,
    agregarPregunta,
    agregarRespuesta,
    finalizarEntrevista,
    limpiarEntrevista,
    obtenerResumenBasico,
    hayEntrevistaEnCurso,
    hayResultados
  };

  return (
    <ContextoEntrevista.Provider value={valor}>
      {children}
    </ContextoEntrevista.Provider>
  );
};

/**
 * Hook para usar el contexto de entrevista
 */
export const useEntrevista = () => {
  const contexto = useContext(ContextoEntrevista);
  if (!contexto) {
    throw new Error('useEntrevista debe usarse dentro de un ProveedorEntrevista');
  }
  return contexto;
};

export default ContextoEntrevista;
