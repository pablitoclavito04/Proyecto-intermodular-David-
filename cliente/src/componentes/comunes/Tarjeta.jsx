import React from 'react';
import '../../estilos/estilos.css';

/**
 * Componente Tarjeta reutilizable
 * @param {ReactNode} children - Contenido de la tarjeta
 * @param {boolean} clickeable - Si la tarjeta es clickeable
 * @param {function} onClick - Función a ejecutar al hacer clic
 * @param {string} className - Clases adicionales
 */
const Tarjeta = ({ 
  children, 
  clickeable = false,
  onClick,
  className = '',
  ...props 
}) => {
  const clases = [
    'tarjeta',
    clickeable && 'tarjeta--clickeable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={clases}
      onClick={clickeable ? onClick : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

// Subcomponentes para estructura de tarjeta
Tarjeta.Encabezado = ({ children, className = '' }) => (
  <div className={`tarjeta__encabezado ${className}`}>
    {children}
  </div>
);

Tarjeta.Titulo = ({ children, className = '' }) => (
  <h3 className={`tarjeta__titulo ${className}`}>
    {children}
  </h3>
);

Tarjeta.Subtitulo = ({ children, className = '' }) => (
  <p className={`tarjeta__subtitulo ${className}`}>
    {children}
  </p>
);

Tarjeta.Cuerpo = ({ children, className = '' }) => (
  <div className={`tarjeta__cuerpo ${className}`}>
    {children}
  </div>
);

Tarjeta.Pie = ({ children, className = '' }) => (
  <div className={`tarjeta__pie ${className}`}>
    {children}
  </div>
);

export default Tarjeta;
