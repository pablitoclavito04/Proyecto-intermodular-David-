import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../estilos/estilos.css';

const CrearCuenta = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    contrasena: '',
    confirmarContrasena: '',
    aceptarTerminos: false
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }
    
    if (!formulario.apellidos.trim()) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios';
    }
    
    if (!formulario.email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      nuevosErrores.email = 'El correo electrónico no es válido';
    }
    
    if (!formulario.contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria';
    } else if (formulario.contrasena.length < 8) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formulario.contrasena)) {
      nuevosErrores.contrasena = 'La contraseña debe contener mayúsculas, minúsculas y números';
    }
    
    if (formulario.contrasena !== formulario.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden';
    }
    
    if (!formulario.aceptarTerminos) {
      nuevosErrores.aceptarTerminos = 'Debes aceptar los términos y condiciones';
    }
    
    return nuevosErrores;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    const nuevosErrores = validarFormulario();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setCargando(true);
    
    try {
      // Aquí iría la llamada a la API
      // const respuesta = await registrarUsuario(formulario);
      console.log('Formulario enviado:', formulario);
      
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redireccionar al lobby después del registro exitoso
      navigate('/lobby');
      
    } catch (error) {
      setErrores({ general: 'Error al crear la cuenta. Por favor, intenta de nuevo.' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-pagina">
      <div className="auth-caja">
        <div className="auth-caja__logo">
          PrepáraT
        </div>
        
        <h1 className="auth-caja__titulo">Crear Cuenta</h1>
        <p className="auth-caja__subtitulo">
          Únete a PrepáraT y comienza tu preparación
        </p>

        {errores.general && (
          <div className="alerta alerta--error">
            <div className="alerta__contenido">
              <p>{errores.general}</p>
            </div>
          </div>
        )}

        <form className="formulario" onSubmit={manejarEnvio}>
          <div className="formulario__grupo">
            <label htmlFor="nombre" className="formulario__etiqueta formulario__etiqueta--requerido">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={`formulario__input ${errores.nombre ? 'formulario__input--error' : ''}`}
              placeholder="Tu nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              disabled={cargando}
            />
            {errores.nombre && (
              <span className="formulario__mensaje-error">
                {errores.nombre}
              </span>
            )}
          </div>

          <div className="formulario__grupo">
            <label htmlFor="apellidos" className="formulario__etiqueta formulario__etiqueta--requerido">
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              className={`formulario__input ${errores.apellidos ? 'formulario__input--error' : ''}`}
              placeholder="Tus apellidos"
              value={formulario.apellidos}
              onChange={manejarCambio}
              disabled={cargando}
            />
            {errores.apellidos && (
              <span className="formulario__mensaje-error">
                {errores.apellidos}
              </span>
            )}
          </div>

          <div className="formulario__grupo">
            <label htmlFor="email" className="formulario__etiqueta formulario__etiqueta--requerido">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`formulario__input ${errores.email ? 'formulario__input--error' : ''}`}
              placeholder="tu@email.com"
              value={formulario.email}
              onChange={manejarCambio}
              disabled={cargando}
            />
            {errores.email && (
              <span className="formulario__mensaje-error">
                {errores.email}
              </span>
            )}
          </div>

          <div className="formulario__grupo">
            <label htmlFor="contrasena" className="formulario__etiqueta formulario__etiqueta--requerido">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              className={`formulario__input ${errores.contrasena ? 'formulario__input--error' : ''}`}
              placeholder="Mínimo 8 caracteres"
              value={formulario.contrasena}
              onChange={manejarCambio}
              disabled={cargando}
            />
            {errores.contrasena && (
              <span className="formulario__mensaje-error">
                {errores.contrasena}
              </span>
            )}
          </div>

          <div className="formulario__grupo">
            <label htmlFor="confirmarContrasena" className="formulario__etiqueta formulario__etiqueta--requerido">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              className={`formulario__input ${errores.confirmarContrasena ? 'formulario__input--error' : ''}`}
              placeholder="Repite tu contraseña"
              value={formulario.confirmarContrasena}
              onChange={manejarCambio}
              disabled={cargando}
            />
            {errores.confirmarContrasena && (
              <span className="formulario__mensaje-error">
                {errores.confirmarContrasena}
              </span>
            )}
          </div>

          <div className="formulario__grupo">
            <div className="formulario__checkbox-grupo">
              <input
                type="checkbox"
                id="aceptarTerminos"
                name="aceptarTerminos"
                className="formulario__checkbox"
                checked={formulario.aceptarTerminos}
                onChange={manejarCambio}
              />
              <label htmlFor="aceptarTerminos">
                Acepto los <a href="/terminos" className="texto-primario">términos y condiciones</a>
              </label>
            </div>
            {errores.aceptarTerminos && (
              <span className="formulario__mensaje-error">
                {errores.aceptarTerminos}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="boton boton--primario boton--completo boton--grande"
            disabled={cargando}
          >
            {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>


        <div className="auth-caja__enlace">
          <p>¿Ya tienes una cuenta? <Link to="/inicio-sesion">Iniciar sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default CrearCuenta;
