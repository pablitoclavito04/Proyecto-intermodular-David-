import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contexto/ContextoAutenticacion';
import { useEntrevista } from '../contexto/ContextoEntrevista';
import '../estilos/estilos.css';

const Pago = () => {
  const navigate = useNavigate();
  const { usuario, actualizarAPremium, agregarEntrevistaAlHistorial } = useAutenticacion();
  const { resultados, limpiarEntrevista } = useEntrevista();
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');

  const handlePagoGratuito = () => {
    // Agregar entrevista al historial pero sin acceso al análisis detallado
    if (resultados) {
      agregarEntrevistaAlHistorial({
        ...resultados.entrevista,
        tipoAcceso: 'gratuito'
      });
    }
    
    limpiarEntrevista();
    navigate('/lobby');
  };

  const handlePagoPremium = async () => {
    setProcesando(true);
    setError('');

    try {
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Actualizar usuario a premium
      const resultado = await actualizarAPremium();

      if (resultado.exito) {
        // Agregar entrevista al historial con acceso completo
        if (resultados) {
          agregarEntrevistaAlHistorial({
            ...resultados.entrevista,
            tipoAcceso: 'premium'
          });
        }

        limpiarEntrevista();
        navigate('/lobby');
      } else {
        setError('No se pudo procesar el pago. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en el pago:', error);
      setError('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-principal)', padding: 'var(--espacio-2xl) 0' }}>
      <div className="contenedor" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)', textAlign: 'center' }}>
          Elige tu Plan
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-2xl)' }}>
          Para descargar el análisis detallado de tu entrevista, elige una de las siguientes opciones
        </p>

        {error && (
          <div className="alerta alerta--error" style={{ marginBottom: 'var(--espacio-xl)' }}>
            <div className="alerta__contenido">
              <p>{error}</p>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--espacio-2xl)' }}>
          {/* Plan Gratuito */}
          <div className="tarjeta" style={{ textAlign: 'center' }}>
            <div className="tarjeta__encabezado">
              <h3 className="tarjeta__titulo">Gratuito</h3>
              <div style={{ fontSize: 'var(--fuente-4xl)', fontWeight: '700', margin: 'var(--espacio-lg) 0' }}>
                0€<span style={{ fontSize: 'var(--fuente-base)', fontWeight: 'normal', color: 'var(--texto-secundario)' }}>/siempre</span>
              </div>
            </div>
            <div className="tarjeta__cuerpo">
              <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--espacio-md)' }}>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span>Resultado básico (Aprobado/No Aprobado)</span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span>Puntuación global</span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--texto-secundario)' }}>✗</span>
                  <span style={{ color: 'var(--texto-secundario)' }}>Sin análisis detallado</span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--texto-secundario)' }}>✗</span>
                  <span style={{ color: 'var(--texto-secundario)' }}>Sin descarga de resultados</span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--texto-secundario)' }}>✗</span>
                  <span style={{ color: 'var(--texto-secundario)' }}>Sin historial de entrevistas</span>
                </li>
              </ul>
            </div>
            <div className="tarjeta__pie">
              <button
                onClick={handlePagoGratuito}
                disabled={procesando}
                className="boton boton--secundario boton--completo"
              >
                Continuar Gratis
              </button>
            </div>
          </div>

          {/* Plan Premium */}
          <div className="tarjeta" style={{ textAlign: 'center', border: '2px solid var(--color-primario)', position: 'relative' }}>
            <div className="insignia insignia--primario" style={{ marginBottom: 'var(--espacio-md)' }}>
              Recomendado
            </div>
            <div className="tarjeta__encabezado">
              <h3 className="tarjeta__titulo">Premium</h3>
              <div style={{ fontSize: 'var(--fuente-4xl)', fontWeight: '700', margin: 'var(--espacio-lg) 0' }}>
                9.99€<span style={{ fontSize: 'var(--fuente-base)', fontWeight: 'normal', color: 'var(--texto-secundario)' }}>/análisis</span>
              </div>
            </div>
            <div className="tarjeta__cuerpo">
              <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--espacio-md)' }}>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span>Todo lo del plan gratuito</span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span><strong>Análisis detallado completo</strong></span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span><strong>Feedback por cada pregunta</strong></span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span><strong>Respuestas ideales de ejemplo</strong></span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span><strong>Descarga de resultados en PDF</strong></span>
                </li>
                <li style={{ display: 'flex', gap: 'var(--espacio-sm)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-exito)' }}>✓</span>
                  <span><strong>Historial completo de entrevistas</strong></span>
                </li>
              </ul>
            </div>
            <div className="tarjeta__pie">
              <button
                onClick={handlePagoPremium}
                disabled={procesando}
                className="boton boton--primario boton--completo"
              >
                {procesando ? 'Procesando...' : 'Obtener Análisis Premium'}
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--espacio-2xl)', textAlign: 'center', padding: 'var(--espacio-lg)', backgroundColor: 'var(--bg-secundario)', borderRadius: 'var(--radio-md)' }}>
          <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
            ¿Por qué Premium?
          </h3>
          <p style={{ color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-md)' }}>
            El análisis detallado te ayuda a identificar exactamente qué mejorar en tus respuestas, 
            con ejemplos concretos y feedback específico para cada pregunta.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--espacio-md)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--espacio-xs)' }}>
              <span>🎯</span>
              <span style={{ fontSize: 'var(--fuente-sm)' }}>Feedback específico</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--espacio-xs)' }}>
              <span>📊</span>
              <span style={{ fontSize: 'var(--fuente-sm)' }}>Análisis completo</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--espacio-xs)' }}>
              <span>💾</span>
              <span style={{ fontSize: 'var(--fuente-sm)' }}>Guarda tu progreso</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--espacio-xs)' }}>
              <span>📥</span>
              <span style={{ fontSize: 'var(--fuente-sm)' }}>Descarga PDF</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;
