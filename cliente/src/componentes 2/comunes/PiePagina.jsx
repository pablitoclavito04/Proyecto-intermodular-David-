import React from 'react';
import '../../estilos/estilos.css';

const PiePagina = () => {
  const anoActual = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-oscuro)', 
      color: 'var(--texto-claro)', 
      padding: 'var(--espacio-2xl) 0',
      marginTop: 'auto'
    }}>
      <div className="contenedor">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--espacio-2xl)',
          marginBottom: 'var(--espacio-2xl)'
        }}>
          {/* Columna 1: Logo y Descripción */}
          <div>
            <h3 style={{ 
              fontSize: 'var(--fuente-xl)', 
              fontWeight: '700', 
              marginBottom: 'var(--espacio-md)',
              color: 'var(--color-primario)'
            }}>
              PrepáraT
            </h3>
            <p style={{ color: 'var(--texto-secundario)', lineHeight: '1.6' }}>
              Tu plataforma de preparación para entrevistas con inteligencia artificial.
            </p>
          </div>

          {/* Columna 2: Producto */}
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: 'var(--espacio-md)' }}>
              Producto
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)' }}>
              <li>
                <a href="/#funcionalidades" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="/#como-funciona" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Cómo Funciona
                </a>
              </li>
              <li>
                <a href="/#precios" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Precios
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: 'var(--espacio-md)' }}>
              Soporte
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)' }}>
              <li>
                <a href="/ayuda" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="/contacto" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Contacto
                </a>
              </li>
              <li>
                <a href="/faq" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Legal */}
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: 'var(--espacio-md)' }}>
              Legal
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)' }}>
              <li>
                <a href="/terminos" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="/privacidad" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/cookies" style={{ color: 'var(--texto-secundario)', transition: 'color var(--transicion-rapida)' }}>
                  Política de Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div style={{ 
          marginTop: 'var(--espacio-2xl)', 
          paddingTop: 'var(--espacio-lg)', 
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Redes Sociales */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'var(--espacio-lg)',
            marginBottom: 'var(--espacio-lg)'
          }}>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--texto-secundario)', 
                fontSize: 'var(--fuente-xl)',
                transition: 'color var(--transicion-rapida)'
              }}
              title="Twitter"
            >
              🐦
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--texto-secundario)', 
                fontSize: 'var(--fuente-xl)',
                transition: 'color var(--transicion-rapida)'
              }}
              title="LinkedIn"
            >
              💼
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--texto-secundario)', 
                fontSize: 'var(--fuente-xl)',
                transition: 'color var(--transicion-rapida)'
              }}
              title="GitHub"
            >
              💻
            </a>
          </div>

          {/* Copyright */}
          <p style={{ 
            textAlign: 'center', 
            color: 'var(--texto-secundario)',
            fontSize: 'var(--fuente-sm)'
          }}>
            © {anoActual} PrepáraT. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PiePagina;
