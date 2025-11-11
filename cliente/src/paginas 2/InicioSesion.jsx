import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../estilos/estilos.css';

const InicioSesion = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    email: '',
    contrasena: ''
  });
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formulario.email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      nuevosErrores.email = 'El correo electrónico no es válido';
    }
    
    if (!formulario.contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria';
    } else if (formulario.contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
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
      // const respuesta = await iniciarSesion(formulario);
      console.log('Formulario enviado:', formulario);
      
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redireccionar al lobby después del inicio de sesión exitoso
      navigate('/lobby');
      
    } catch (error) {
      setErrores({ general: 'Error al iniciar sesión. Por favor, intenta de nuevo.' });
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
        
        <h1 className="auth-caja__titulo">Iniciar Sesión</h1>
        <p className="auth-caja__subtitulo">
          Accede a tu cuenta para comenzar a practicar
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
              placeholder="••••••••"
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

          <div className="formulario__checkbox-grupo">
            <input
              type="checkbox"
              id="recordar"
              className="formulario__checkbox"
            />
            <label htmlFor="recordar">Recordarme</label>
          </div>

          <button
            type="submit"
            className="boton boton--primario boton--completo boton--grande"
            disabled={cargando}
          >
            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-caja__divider">
          <span>o</span>
        </div>

        <button className="boton boton--secundario boton--completo">
          <span>🔐</span> Continuar con Google
        </button>

        <div className="auth-caja__enlace">
          <p>¿No tienes una cuenta? <Link to="/crear-cuenta">Crear cuenta</Link></p>
        </div>

        <div className="auth-caja__enlace">
          <p><Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link></p>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
