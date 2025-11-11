import React from 'react';
import '../../estilos/estilos.css';

/**
 * Componente Boton reutilizable
 * @param {string} tipo - primario | secundario | exito | error | outline
 * @param {string} tamano - pequeno | normal | grande
 * @param {boolean} completo - Ocupa todo el ancho disponible
 * @param {boolean} redondeado - Bordes completamente redondeados
 * @param {boolean} deshabilitado - Estado deshabilitado
 * @param {function} onClick - Función a ejecutar al hacer clic
 * @param {ReactNode} children - Contenido del botón
 * @param {string} className - Clases adicionales
 */
const Boton = ({ 
  tipo = 'primario', 
  tamano = 'normal', 
  completo = false,
  redondeado = false,
  deshabilitado = false,
  onClick,
  children,
  className = '',
  ...props 
}) => {
  const clases = [
    'boton',
    `boton--${tipo}`,
    tamano === 'pequeno' && 'boton--pequeno',
    tamano === 'grande' && 'boton--grande',
    completo && 'boton--completo',
    redondeado && 'boton--redondeado',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={clases}
      disabled={deshabilitado}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Boton;
