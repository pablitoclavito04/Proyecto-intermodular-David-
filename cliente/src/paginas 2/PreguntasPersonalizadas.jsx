import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEntrevista } from '../contexto/ContextoEntrevista';
import '../estilos/estilos.css';

const PreguntasPersonalizadas = () => {
  const navigate = useNavigate();
  const { iniciarEntrevista } = useEntrevista();
  
  const [preguntas, setPreguntas] = useState(['']);
  const [titulo, setTitulo] = useState('');
  const [guardando, setGuardando] = useState(false);

  const agregarPregunta = () => {
    setPreguntas([...preguntas, '']);
  };

  const eliminarPregunta = (indice) => {
    if (preguntas.length > 1) {
      const nuevasPreguntas = preguntas.filter((_, i) => i !== indice);
      setPreguntas(nuevasPreguntas);
    }
  };

  const actualizarPregunta = (indice, valor) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice] = valor;
    setPreguntas(nuevasPreguntas);
  };

  const manejarIniciar = async (e) => {
    e.preventDefault();
    
    const preguntasValidas = preguntas.filter(p => p.trim() !== '');
    
    if (preguntasValidas.length < 3) {
      alert('Debes agregar al menos 3 preguntas');
      return;
    }

    setGuardando(true);
    
    try {
      console.log('✅ Iniciando entrevista personalizada:', { 
        titulo, 
        preguntas: preguntasValidas 
      });
      
      // Iniciar la entrevista con preguntas personalizadas
      iniciarEntrevista({
        tipo: 'user_defined',
        tema: titulo,
        preguntas: preguntasValidas.map(p => ({ texto: p }))
      });
      
      // Navegar a la pantalla de carga primero
      navigate('/pantalla-carga');
      
    } catch (error) {
      console.error('❌ Error al iniciar entrevista:', error);
      alert('Hubo un error al iniciar la entrevista. Por favor, intenta nuevamente.');
    } finally {
      setGuardando(false);
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
            <div style={{ fontSize: '4rem', marginBottom: 'var(--espacio-md)' }}>✏️</div>
            <h1 style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
              Preguntas Personalizadas
            </h1>
            <p style={{ color: 'var(--texto-secundario)', fontSize: 'var(--fuente-lg)' }}>
              Crea tu lista de preguntas específicas para practicar
            </p>
          </div>

          <div className="tarjeta">
            <form className="formulario" onSubmit={manejarIniciar}>
              {/* Título de la Entrevista */}
              <div className="formulario__grupo">
                <label htmlFor="titulo" className="formulario__etiqueta formulario__etiqueta--requerido">
                  Título de la Entrevista
                </label>
                <input
                  type="text"
                  id="titulo"
                  className="formulario__input"
                  placeholder="Ej: Preparación Backend Developer"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  disabled={guardando}
                />
              </div>

              {/* Lista de Preguntas */}
              <div className="formulario__grupo">
                <label className="formulario__etiqueta">
                  Tus Preguntas (mínimo 3)
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-md)' }}>
                  {preguntas.map((pregunta, indice) => (
                    <div key={indice} className="flex gap-md" style={{ alignItems: 'flex-start' }}>
                      <span style={{ 
                        minWidth: '30px', 
                        height: '30px',
                        borderRadius: '50%', 
                        backgroundColor: 'var(--color-primario)', 
                        color: 'var(--texto-claro)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: '600',
                        marginTop: 'var(--espacio-sm)'
                      }}>
                        {indice + 1}
                      </span>
                      <textarea
                        className="formulario__input formulario__textarea"
                        placeholder="Escribe tu pregunta aquí..."
                        value={pregunta}
                        onChange={(e) => actualizarPregunta(indice, e.target.value)}
                        disabled={guardando}
                        style={{ minHeight: '80px', flex: 1 }}
                      />
                      {preguntas.length > 1 && (
                        <button
                          type="button"
                          className="boton boton--error boton--pequeno"
                          onClick={() => eliminarPregunta(indice)}
                          disabled={guardando}
                          style={{ marginTop: 'var(--espacio-sm)' }}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="boton boton--secundario"
                  onClick={agregarPregunta}
                  disabled={guardando}
                  style={{ marginTop: 'var(--espacio-md)' }}
                >
                  + Agregar Pregunta
                </button>
              </div>

              {/* Información */}
              <div className="alerta alerta--info">
                <div className="alerta__contenido">
                  <p className="alerta__titulo">💡 Consejos</p>
                  <ul style={{ marginTop: 'var(--espacio-sm)', paddingLeft: 'var(--espacio-lg)' }}>
                    <li>Haz preguntas claras y específicas</li>
                    <li>Mezcla preguntas técnicas y comportamentales</li>
                    <li>Considera el tiempo de respuesta (2-3 minutos por pregunta)</li>
                  </ul>
                </div>
              </div>

              {/* Resumen */}
              <div className="tarjeta" style={{ backgroundColor: 'var(--bg-secundario)', marginTop: 'var(--espacio-lg)' }}>
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                  📊 Resumen
                </h3>
                <div className="flex-entre" style={{ marginBottom: 'var(--espacio-sm)' }}>
                  <span>Total de preguntas:</span>
                  <strong>{preguntas.filter(p => p.trim() !== '').length}</strong>
                </div>
                <div className="flex-entre">
                  <span>Duración estimada:</span>
                  <strong>{Math.ceil(preguntas.filter(p => p.trim() !== '').length * 1.5)} - {preguntas.filter(p => p.trim() !== '').length * 2} minutos</strong>
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
                  disabled={guardando}
                >
                  {guardando ? 'Iniciando...' : 'Iniciar Entrevista'}
                </button>
              </div>
            </form>
          </div>

          {/* Plantillas Sugeridas */}
          <section style={{ marginTop: 'var(--espacio-2xl)' }}>
            <h2 style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)', textAlign: 'center' }}>
              Plantillas Sugeridas
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--espacio-lg)' }}>
              <div className="tarjeta tarjeta--clickeable">
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                  💻 Desarrollador Full Stack
                </h3>
                <p style={{ color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-md)' }}>
                  10 preguntas sobre frontend, backend y arquitectura
                </p>
                <button className="boton boton--outline boton--pequeno">
                  Usar Plantilla
                </button>
              </div>

              <div className="tarjeta tarjeta--clickeable">
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                  📊 Data Analyst
                </h3>
                <p style={{ color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-md)' }}>
                  8 preguntas sobre SQL, visualización y análisis
                </p>
                <button className="boton boton--outline boton--pequeno">
                  Usar Plantilla
                </button>
              </div>

              <div className="tarjeta tarjeta--clickeable">
                <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                  🎨 UX/UI Designer
                </h3>
                <p style={{ color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-md)' }}>
                  12 preguntas sobre diseño, proceso y portfolio
                </p>
                <button className="boton boton--outline boton--pequeno">
                  Usar Plantilla
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default PreguntasPersonalizadas;
