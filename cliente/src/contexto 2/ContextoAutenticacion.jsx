/**
 * Contexto de Autenticación
 * Gestiona el estado del usuario (anónimo, gratuito, premium)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ContextoAutenticacion = createContext();

export const TipoUsuario = {
  ANONIMO: 'anonimo',
  GRATUITO: 'gratuito',
  PREMIUM: 'premium'
};

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.removeItem('usuario');
      }
    }
    setCargando(false);
  }, []);

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  /**
   * Iniciar sesión
   */
  const iniciarSesion = async (email, contrasena) => {
    try {
      // Aquí iría la llamada a la API
      // const respuesta = await fetch('/api/auth/login', { ... });
      
      // Simulación - En producción vendría del servidor
      const usuarioAutenticado = {
        id: Date.now().toString(),
        email: email,
        nombre: email.split('@')[0],
        tipo: TipoUsuario.GRATUITO,
        fechaRegistro: new Date().toISOString(),
        historialEntrevistas: []
      };

      setUsuario(usuarioAutenticado);
      return { exito: true, usuario: usuarioAutenticado };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return { exito: false, error: error.message };
    }
  };

  /**
   * Crear cuenta
   */
  const crearCuenta = async (datosUsuario) => {
    try {
      // Aquí iría la llamada a la API
      // const respuesta = await fetch('/api/auth/registro', { ... });
      
      // Simulación
      const nuevoUsuario = {
        id: Date.now().toString(),
        email: datosUsuario.email,
        nombre: datosUsuario.nombre,
        apellidos: datosUsuario.apellidos,
        tipo: TipoUsuario.GRATUITO,
        fechaRegistro: new Date().toISOString(),
        historialEntrevistas: []
      };

      setUsuario(nuevoUsuario);
      return { exito: true, usuario: nuevoUsuario };
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      return { exito: false, error: error.message };
    }
  };

  /**
   * Cerrar sesión
   */
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('entrevistaActual');
  };

  /**
   * Actualizar a Premium
   */
  const actualizarAPremium = async () => {
    try {
      // Aquí iría la llamada a la API de pago
      // const respuesta = await fetch('/api/pagos/premium', { ... });
      
      const usuarioActualizado = {
        ...usuario,
        tipo: TipoUsuario.PREMIUM,
        fechaPremium: new Date().toISOString()
      };

      setUsuario(usuarioActualizado);
      return { exito: true };
    } catch (error) {
      console.error('Error al actualizar a premium:', error);
      return { exito: false, error: error.message };
    }
  };

  /**
   * Agregar entrevista al historial
   */
  const agregarEntrevistaAlHistorial = (entrevista) => {
    if (usuario && usuario.tipo !== TipoUsuario.ANONIMO) {
      const historialActualizado = [
        ...(usuario.historialEntrevistas || []),
        {
          ...entrevista,
          id: Date.now().toString(),
          fecha: new Date().toISOString()
        }
      ];

      const usuarioActualizado = {
        ...usuario,
        historialEntrevistas: historialActualizado
      };

      setUsuario(usuarioActualizado);
    }
  };

  /**
   * Verificar si el usuario puede descargar resultados
   */
  const puedeDescargarResultados = () => {
    return usuario && usuario.tipo === TipoUsuario.PREMIUM;
  };

  /**
   * Verificar si está autenticado
   */
  const estaAutenticado = () => {
    return usuario !== null;
  };

  /**
   * Verificar si es premium
   */
  const esPremium = () => {
    return usuario && usuario.tipo === TipoUsuario.PREMIUM;
  };

  /**
   * Verificar si es gratuito
   */
  const esGratuito = () => {
    return usuario && usuario.tipo === TipoUsuario.GRATUITO;
  };

  const valor = {
    usuario,
    cargando,
    iniciarSesion,
    crearCuenta,
    cerrarSesion,
    actualizarAPremium,
    agregarEntrevistaAlHistorial,
    puedeDescargarResultados,
    estaAutenticado,
    esPremium,
    esGratuito,
    TipoUsuario
  };

  return (
    <ContextoAutenticacion.Provider value={valor}>
      {!cargando && children}
    </ContextoAutenticacion.Provider>
  );
};

/**
 * Hook para usar el contexto de autenticación
 */
export const useAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de un ProveedorAutenticacion');
  }
  return contexto;
};

export default ContextoAutenticacion;
