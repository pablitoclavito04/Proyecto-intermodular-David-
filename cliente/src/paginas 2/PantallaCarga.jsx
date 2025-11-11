import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEntrevista } from '../contexto/ContextoEntrevista';
import '../estilos/estilos.css';

const PantallaCarga = () => {
  const navigate = useNavigate();
  const { hayEntrevistaEnCurso } = useEntrevista();
  
  const [progreso, setProgreso] = useState(0);
  const [mensajeActual, setMensajeActual] = useState(0);

  const mensajes = [
    { texto: 'Preparando tu entrevista...', icono: '�' },
    { texto: 'Cargando preguntas...', icono: '�' },
    { texto: 'Configurando el sistema de audio...', icono: '🎤' },
    { texto: 'Inicializando IA...', icono: '🤖' },
    { texto: 'Preparando evaluación...', icono: '📊' },
    { texto: '¡Todo listo!', icono: '✨' }
  ];

  useEffect(() => {
    // Verificar si hay una entrevista en curso, si no, redirigir al lobby
    if (!hayEntrevistaEnCurso()) {
      navigate('/lobby');
      return;
    }

    // Simular progreso de carga
    const intervalo = setInterval(() => {
      setProgreso(prev => {
        if (prev >= 100) {
          clearInterval(intervalo);
          // Navegar a la entrevista en curso después de completar
          setTimeout(() => {
            navigate('/entrevista');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100); // Más rápido: 100ms por incremento (total ~5 segundos)

    return () => clearInterval(intervalo);
  }, [navigate, hayEntrevistaEnCurso]);

  useEffect(() => {
    // Cambiar mensaje cada 3 segundos o según progreso
    const indice = Math.floor((progreso / 100) * mensajes.length);
    setMensajeActual(Math.min(indice, mensajes.length - 1));
  }, [progreso, mensajes.length]);

  return (
    <div className="pantalla-carga">
      <div className="pantalla-carga__contenedor">
        {/* Logo */}
        <div className="pantalla-carga__logo">
          PrepáraT
        </div>

        {/* Icono Animado */}
        <div className="pantalla-carga__icono">
          {mensajes[mensajeActual].icono}
        </div>

        {/* Spinner Circular Animado */}
        <div className="pantalla-carga__spinner-contenedor">
          <div className="pantalla-carga__spinner"></div>
        </div>

        {/* Mensaje de Estado */}
        <div className="pantalla-carga__mensaje">
          {mensajes[mensajeActual].texto}
        </div>

        {/* Barra de Progreso */}
        <div className="pantalla-carga__progreso">
          <div className="pantalla-carga__barra">
            <div className="pantalla-carga__barra-relleno" style={{ width: `${progreso}%` }}></div>
          </div>
          <div className="pantalla-carga__porcentaje">
            {progreso}%
          </div>
        </div>

        {/* Indicadores de Pasos */}
        <div className="pantalla-carga__indicadores">
          {mensajes.map((_, indice) => (
            <div 
              key={indice}
              className={`pantalla-carga__indicador ${indice <= mensajeActual ? 'pantalla-carga__indicador--activo' : 'pantalla-carga__indicador--inactivo'}`}
            />
          ))}
        </div>

        {/* Mensaje Adicional */}
        <div className="pantalla-carga__nota">
          Esto puede tomar unos momentos. Por favor, no cierres esta ventana.
        </div>
      </div>
    </div>
  );
};

export default PantallaCarga;
