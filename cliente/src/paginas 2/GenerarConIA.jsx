import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEntrevista } from '../contexto/ContextoEntrevista';
import { generarPreguntas } from '../servicios/servicioAPI';
import '../estilos/estilos.css';

const GenerarConIA = () => {
  const navigate = useNavigate();
  const { iniciarEntrevista } = useEntrevista();
  
  const [formulario, setFormulario] = useState({
    puesto: '',
    industria: '',
    experiencia: 'junior',
    numeroPreguntas: '10',
    enfoque: 'general'
  });
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarGenerar = async (e) => {
    e.preventDefault();
    setGenerando(true);
    setError(null);
    
    try {
      // Construir el tema para la IA
      const tema = `${formulario.puesto} en ${formulario.industria} (${formulario.experiencia})`;
      
      console.log('🤖 Generando preguntas con IA...', {
        tema,
        cantidad: parseInt(formulario.numeroPreguntas),
        enfoque: formulario.enfoque
      });
      
      // Llamar a la API para generar preguntas
      const preguntasGeneradas = await generarPreguntas(
        tema,
        parseInt(formulario.numeroPreguntas)
      );
      
      console.log('✅ Preguntas generadas:', preguntasGeneradas);
      
      // Iniciar la entrevista con las preguntas generadas
      iniciarEntrevista({
        tipo: 'ai_generated',
        tema: tema,
        preguntas: preguntasGeneradas.map(p => ({ texto: p }))
      });
      
      // Navegar a la pantalla de carga primero
      navigate('/pantalla-carga');
      
    } catch (error) {
      console.error('❌ Error al generar preguntas:', error);
      setError('No se pudieron generar las preguntas. Por favor, intenta nuevamente.');
    } finally {
      setGenerando(false);
    }
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
              ← Volver al Lobby
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main style={{ minHeight: '100vh', padding: 'var(--espacio-2xl)' }}>
        <div className="contenedor contenedor--md">
          <div style={{ textAlign: 'center', marginBottom: 'var(--espacio-2xl)' }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--espacio-md)' }}>🤖</div>
            <h1 style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
              Generar Entrevista con IA
            </h1>
            <p style={{ color: 'var(--texto-secundario)', fontSize: 'var(--fuente-lg)' }}>
              Completa la información y nuestra IA creará preguntas personalizadas para ti
            </p>
          </div>

          <div className="tarjeta">
            <form className="formulario" onSubmit={manejarGenerar}>
              {/* Puesto de Trabajo */}
              <div className="formulario__grupo">
                <label htmlFor="puesto" className="formulario__etiqueta formulario__etiqueta--requerido">
                  Puesto de Trabajo
                </label>
                <input
                  type="text"
                  id="puesto"
                  name="puesto"
                  className="formulario__input"
                  placeholder="Ej: Desarrollador Frontend, Product Manager, etc."
                  value={formulario.puesto}
                  onChange={manejarCambio}
                  required
                  disabled={generando}
                />
                <p style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)', marginTop: 'var(--espacio-xs)' }}>
                  El puesto para el que te estás preparando
                </p>
              </div>

              {/* Industria */}
              <div className="formulario__grupo">
                <label htmlFor="industria" className="formulario__etiqueta formulario__etiqueta--requerido">
                  Industria o Sector
                </label>
                <select
                  id="industria"
                  name="industria"
                  className="formulario__input"
                  value={formulario.industria}
                  onChange={manejarCambio}
                  required
                  disabled={generando}
                >
                  <option value="">Selecciona una industria</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="finanzas">Finanzas</option>
                  <option value="salud">Salud</option>
                  <option value="educacion">Educación</option>
                  <option value="retail">Retail</option>
                  <option value="marketing">Marketing</option>
                  <option value="recursos-humanos">Recursos Humanos</option>
                  <option value="startup">Startup</option>
                  <option value="otra">Otra</option>
                </select>
              </div>

              {/* Nivel de Experiencia */}
              <div className="formulario__grupo">
                <label htmlFor="experiencia" className="formulario__etiqueta formulario__etiqueta--requerido">
                  Nivel de Experiencia
                </label>
                <select
                  id="experiencia"
                  name="experiencia"
                  className="formulario__input"
                  value={formulario.experiencia}
                  onChange={manejarCambio}
                  required
                  disabled={generando}
                >
                  <option value="junior">Junior (0-2 años)</option>
                  <option value="mid">Mid-Level (3-5 años)</option>
                  <option value="senior">Senior (6+ años)</option>
                  <option value="lead">Lead/Manager</option>
                </select>
              </div>

              {/* Número de Preguntas */}
              <div className="formulario__grupo">
                <label htmlFor="numeroPreguntas" className="formulario__etiqueta formulario__etiqueta--requerido">
                  Número de Preguntas
                </label>
                <div className="flex gap-md" style={{ alignItems: 'center' }}>
                  <input
                    type="range"
                    id="numeroPreguntas"
                    name="numeroPreguntas"
                    min="5"
                    max="20"
                    step="5"
                    value={formulario.numeroPreguntas}
                    onChange={manejarCambio}
                    disabled={generando}
                    style={{ flex: 1 }}
                  />
                  <div style={{ 
                    minWidth: '50px', 
                    textAlign: 'center', 
                    fontSize: 'var(--fuente-xl)', 
                    fontWeight: '700',
                    color: 'var(--color-primario)'
                  }}>
                    {formulario.numeroPreguntas}
                  </div>
                </div>
                <p style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)', marginTop: 'var(--espacio-xs)' }}>
                  Duración estimada: {Math.ceil(formulario.numeroPreguntas * 1.5)} - {formulario.numeroPreguntas * 2} minutos
                </p>
              </div>

              {/* Enfoque de la Entrevista */}
              <div className="formulario__grupo">
                <label htmlFor="enfoque" className="formulario__etiqueta">
                  Enfoque de la Entrevista
                </label>
                <select
                  id="enfoque"
                  name="enfoque"
                  className="formulario__input"
                  value={formulario.enfoque}
                  onChange={manejarCambio}
                  disabled={generando}
                >
                  <option value="general">General (Técnico + Comportamental)</option>
                  <option value="tecnico">Solo Técnico</option>
                  <option value="comportamental">Solo Comportamental</option>
                  <option value="situacional">Casos y Situaciones</option>
                </select>
              </div>

              {/* Información Adicional */}
              {error && (
                <div className="alerta alerta--error">
                  <div className="alerta__contenido">
                    <p className="alerta__titulo">⚠️ Error</p>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <div className="alerta alerta--info">
                <div className="alerta__contenido">
                  <p className="alerta__titulo">💡 Consejo</p>
                  <p>La IA generará preguntas específicas basadas en tu perfil. Asegúrate de tener un micrófono conectado para responder por voz.</p>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-md" style={{ marginTop: 'var(--espacio-xl)' }}>
                <Link to="/lobby" className="boton boton--secundario" style={{ flex: 1 }}>
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="boton boton--primario"
                  style={{ flex: 2 }}
                  disabled={generando}
                >
                  {generando ? (
                    <span className="flex flex-centrado gap-sm">
                      <span className="cargador__spinner" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }}></span>
                      Generando...
                    </span>
                  ) : (
                    'Generar Entrevista'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sección de Ejemplos */}
          <section style={{ marginTop: 'var(--espacio-2xl)' }}>
            <h2 style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)', textAlign: 'center' }}>
              Ejemplos de Preguntas por Categoría
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--espacio-lg)' }}>
              <div className="tarjeta">
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)', color: 'var(--color-primario)' }}>
                  📚 Técnicas
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)', color: 'var(--texto-secundario)' }}>
                  <li>• ¿Cómo optimizarías una consulta SQL lenta?</li>
                  <li>• Explica el concepto de closure en JavaScript</li>
                  <li>• ¿Cuál es la diferencia entre REST y GraphQL?</li>
                </ul>
              </div>

              <div className="tarjeta">
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)', color: 'var(--color-exito)' }}>
                  💼 Comportamentales
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)', color: 'var(--texto-secundario)' }}>
                  <li>• Cuéntame sobre un proyecto desafiante</li>
                  <li>• ¿Cómo manejas los conflictos en equipo?</li>
                  <li>• Describe una situación donde lideraste</li>
                </ul>
              </div>

              <div className="tarjeta">
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)', color: 'var(--color-advertencia)' }}>
                  🎯 Situacionales
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)', color: 'var(--texto-secundario)' }}>
                  <li>• ¿Qué harías si un proyecto se retrasa?</li>
                  <li>• Cómo priorizas tareas con plazos ajustados</li>
                  <li>• Manejo de feedback negativo del cliente</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default GenerarConIA;
