import React from 'react';
import '../../estilos/estilos.css';

const Cargador = ({ texto = 'Cargando...', tamano = 'normal' }) => {
  const tamanosSpinner = {
    pequeno: '1.5rem',
    normal: '3rem',
    grande: '4rem'
  };

  return (
    <div className="cargador">
      <div 
        className="cargador__spinner" 
        style={{ 
          width: tamanosSpinner[tamano], 
          height: tamanosSpinner[tamano] 
        }}
      ></div>
      {texto && <p className="cargador__texto">{texto}</p>}
    </div>
  );
};

export default Cargador;
