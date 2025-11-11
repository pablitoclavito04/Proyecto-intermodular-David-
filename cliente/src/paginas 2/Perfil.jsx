import React, { useState } from 'react';
import '../estilos/estilos.css';

const Perfil = () => {
  const [editando, setEditando] = useState(false);
  const [usuario, setUsuario] = useState({
    nombre: 'Juan',
    apellidos: 'Pérez García',
    email: 'juan.perez@email.com',
    telefono: '+34 600 123 456',
    ocupacion: 'Desarrollador Frontend',
    ubicacion: 'Madrid, España',
    biografia: 'Desarrollador apasionado por crear experiencias web excepcionales. Especializado en React y tecnologías modernas.'
  });

  const estadisticas = {
    entrevistasCompletadas: 24,
    tasaExito: 78,
    puntuacionMedia: 82,
    tiempoTotal: '8h 45m',
    racha: 5,
    ultimaEntrevista: 'Hace 2 días'
  };

  const historial = [
    {
      id: 1,
      titulo: 'Desarrollador Full Stack',
      fecha: 'Hace 2 días',
      puntuacion: 85,
      aprobado: true,
      duracion: '18 min'
    },
    {
      id: 2,
      titulo: 'Preguntas React Avanzado',
      fecha: 'Hace 1 semana',
      puntuacion: 92,
      aprobado: true,
      duracion: '22 min'
    },
    {
      id: 3,
      titulo: 'Backend con Node.js',
      fecha: 'Hace 2 semanas',
      puntuacion: 68,
      aprobado: false,
      duracion: '15 min'
    }
  ];

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarCambios = () => {
    // Aquí iría la llamada a la API para guardar
    console.log('Guardando cambios:', usuario);
    setEditando(false);
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
            <a href="/lobby" className="encabezado__enlace">
              Inicio
            </a>
            <a href="/perfil" className="encabezado__enlace encabezado__enlace--activo">
              Mi Perfil
            </a>
            <a href="/historial" className="encabezado__enlace">
              Historial
            </a>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="perfil">
        <div className="contenedor">
          {/* Encabezado del Perfil */}
          <div className="perfil__encabezado">
            <div className="avatar avatar--grande">
              {usuario.nombre.charAt(0)}{usuario.apellidos.charAt(0)}
            </div>
            
            <div className="perfil__info">
              <h1 className="perfil__nombre">
                {usuario.nombre} {usuario.apellidos}
              </h1>
              <p className="perfil__email">{usuario.email}</p>
              <div style={{ display: 'flex', gap: 'var(--espacio-md)', marginTop: 'var(--espacio-sm)', color: 'var(--texto-secundario)' }}>
                <span>💼 {usuario.ocupacion}</span>
                <span>📍 {usuario.ubicacion}</span>
              </div>
            </div>

            <button 
              className={`boton ${editando ? 'boton--primario' : 'boton--secundario'}`}
              onClick={() => editando ? guardarCambios() : setEditando(true)}
            >
              {editando ? '💾 Guardar Cambios' : '✏️ Editar Perfil'}
            </button>
          </div>

          {/* Estadísticas */}
          <section>
            <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)' }}>
              📊 Tus Estadísticas
            </h2>
            
            <div className="perfil__estadisticas">
              <div className="estadistica">
                <div className="estadistica__valor">{estadisticas.entrevistasCompletadas}</div>
                <div className="estadistica__etiqueta">Entrevistas Completadas</div>
              </div>
              
              <div className="estadistica">
                <div className="estadistica__valor" style={{ color: 'var(--color-exito)' }}>
                  {estadisticas.tasaExito}%
                </div>
                <div className="estadistica__etiqueta">Tasa de Éxito</div>
              </div>
              
              <div className="estadistica">
                <div className="estadistica__valor" style={{ color: 'var(--color-info)' }}>
                  {estadisticas.puntuacionMedia}
                </div>
                <div className="estadistica__etiqueta">Puntuación Media</div>
              </div>
              
              <div className="estadistica">
                <div className="estadistica__valor" style={{ color: 'var(--color-advertencia)' }}>
                  {estadisticas.tiempoTotal}
                </div>
                <div className="estadistica__etiqueta">Tiempo Practicado</div>
              </div>
              
              <div className="estadistica">
                <div className="estadistica__valor">🔥 {estadisticas.racha}</div>
                <div className="estadistica__etiqueta">Días de Racha</div>
              </div>
            </div>
          </section>

          {/* Información Personal */}
          <section style={{ marginTop: 'var(--espacio-2xl)' }}>
            <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)' }}>
              👤 Información Personal
            </h2>
            
            <div className="tarjeta">
              {editando ? (
                <form className="formulario">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--espacio-lg)' }}>
                    <div className="formulario__grupo">
                      <label htmlFor="nombre" className="formulario__etiqueta">Nombre</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="formulario__input"
                        value={usuario.nombre}
                        onChange={manejarCambio}
                      />
                    </div>
                    
                    <div className="formulario__grupo">
                      <label htmlFor="apellidos" className="formulario__etiqueta">Apellidos</label>
                      <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        className="formulario__input"
                        value={usuario.apellidos}
                        onChange={manejarCambio}
                      />
                    </div>
                    
                    <div className="formulario__grupo">
                      <label htmlFor="email" className="formulario__etiqueta">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="formulario__input"
                        value={usuario.email}
                        onChange={manejarCambio}
                      />
                    </div>
                    
                    <div className="formulario__grupo">
                      <label htmlFor="telefono" className="formulario__etiqueta">Teléfono</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        className="formulario__input"
                        value={usuario.telefono}
                        onChange={manejarCambio}
                      />
                    </div>
                    
                    <div className="formulario__grupo">
                      <label htmlFor="ocupacion" className="formulario__etiqueta">Ocupación</label>
                      <input
                        type="text"
                        id="ocupacion"
                        name="ocupacion"
                        className="formulario__input"
                        value={usuario.ocupacion}
                        onChange={manejarCambio}
                      />
                    </div>
                    
                    <div className="formulario__grupo">
                      <label htmlFor="ubicacion" className="formulario__etiqueta">Ubicación</label>
                      <input
                        type="text"
                        id="ubicacion"
                        name="ubicacion"
                        className="formulario__input"
                        value={usuario.ubicacion}
                        onChange={manejarCambio}
                      />
                    </div>
                  </div>
                  
                  <div className="formulario__grupo">
                    <label htmlFor="biografia" className="formulario__etiqueta">Biografía</label>
                    <textarea
                      id="biografia"
                      name="biografia"
                      className="formulario__input formulario__textarea"
                      value={usuario.biografia}
                      onChange={manejarCambio}
                    />
                  </div>
                </form>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--espacio-lg)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-xs)' }}>
                      Nombre Completo
                    </div>
                    <div style={{ fontWeight: '600' }}>{usuario.nombre} {usuario.apellidos}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-xs)' }}>
                      Email
                    </div>
                    <div style={{ fontWeight: '600' }}>{usuario.email}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-xs)' }}>
                      Teléfono
                    </div>
                    <div style={{ fontWeight: '600' }}>{usuario.telefono}</div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-xs)' }}>
                      Ocupación
                    </div>
                    <div style={{ fontWeight: '600' }}>{usuario.ocupacion}</div>
                  </div>
                  
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-xs)' }}>
                      Biografía
                    </div>
                    <div style={{ fontWeight: '600' }}>{usuario.biografia}</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Historial Reciente */}
          <section style={{ marginTop: 'var(--espacio-2xl)' }}>
            <div className="flex-entre" style={{ marginBottom: 'var(--espacio-lg)' }}>
              <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700' }}>
                📝 Historial Reciente
              </h2>
              <a href="/historial" className="boton boton--secundario">
                Ver Todo
              </a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-md)' }}>
              {historial.map(entrevista => (
                <div key={entrevista.id} className="tarjeta">
                  <div className="flex-entre" style={{ marginBottom: 'var(--espacio-sm)' }}>
                    <h3 style={{ fontSize: 'var(--fuente-lg)', fontWeight: '700' }}>
                      {entrevista.titulo}
                    </h3>
                    <span className={`insignia ${entrevista.aprobado ? 'insignia--exito' : 'insignia--error'}`}>
                      {entrevista.aprobado ? 'Aprobado' : 'No Aprobado'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 'var(--espacio-xl)', color: 'var(--texto-secundario)', fontSize: 'var(--fuente-sm)' }}>
                    <span>📅 {entrevista.fecha}</span>
                    <span>⏱️ {entrevista.duracion}</span>
                    <span style={{ 
                      color: entrevista.puntuacion >= 80 ? 'var(--color-exito)' : entrevista.puntuacion >= 60 ? 'var(--color-advertencia)' : 'var(--color-error)',
                      fontWeight: '700'
                    }}>
                      📊 {entrevista.puntuacion}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Configuración */}
          <section style={{ marginTop: 'var(--espacio-2xl)' }}>
            <h2 style={{ fontSize: 'var(--fuente-2xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)' }}>
              ⚙️ Configuración
            </h2>
            
            <div className="tarjeta">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-lg)' }}>
                <div className="flex-entre">
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: 'var(--espacio-xs)' }}>
                      Notificaciones por Email
                    </div>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)' }}>
                      Recibe actualizaciones y recordatorios
                    </div>
                  </div>
                  <input type="checkbox" className="formulario__checkbox" defaultChecked />
                </div>
                
                <div className="flex-entre">
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: 'var(--espacio-xs)' }}>
                      Guardar Grabaciones
                    </div>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)' }}>
                      Mantener audio de tus entrevistas
                    </div>
                  </div>
                  <input type="checkbox" className="formulario__checkbox" defaultChecked />
                </div>
                
                <div className="flex-entre">
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: 'var(--espacio-xs)' }}>
                      Modo Oscuro
                    </div>
                    <div style={{ fontSize: 'var(--fuente-sm)', color: 'var(--texto-secundario)' }}>
                      Cambiar tema de la aplicación
                    </div>
                  </div>
                  <input type="checkbox" className="formulario__checkbox" />
                </div>
              </div>
              
              <div style={{ marginTop: 'var(--espacio-2xl)', paddingTop: 'var(--espacio-lg)', borderTop: '1px solid var(--borde-color)' }}>
                <button className="boton boton--error">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Perfil;
