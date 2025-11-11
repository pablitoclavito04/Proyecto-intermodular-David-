import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/estilos.css';

const PaginaPrincipal = () => {
  return (
    <>
      {/* Encabezado */}
      <header className="encabezado">
        <div className="encabezado__contenedor">
          <div className="encabezado__logo">
            PrepáraT
          </div>
          <nav className="encabezado__nav">
            <a href="#funcionalidades" className="encabezado__enlace">
              Funcionalidades
            </a>
            <a href="#como-funciona" className="encabezado__enlace">
              Cómo Funciona
            </a>
            <a href="#precios" className="encabezado__enlace">
              Precios
            </a>
            <Link to="/inicio-sesion" className="boton boton--outline">
              Iniciar Sesión
            </Link>
            <Link to="/crear-cuenta" className="boton boton--primario">
              Comenzar Gratis
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pantalla-completa pantalla-completa--centrada">
        <div className="contenedor texto-centrado">
          <h1 style={{ fontSize: 'var(--fuente-4xl)', fontWeight: '700', marginBottom: 'var(--espacio-lg)', lineHeight: '1.2' }}>
            Prepárate para tu próxima<br />
            <span className="texto-primario">entrevista de trabajo</span>
          </h1>
          <p style={{ fontSize: 'var(--fuente-xl)', color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-2xl)', maxWidth: '700px', margin: '0 auto var(--espacio-2xl)' }}>
            Practica con nuestra IA avanzada y recibe feedback instantáneo para mejorar tus habilidades de entrevista
          </p>
          <div className="flex flex-centrado gap-lg" style={{ justifyContent: 'center' }}>
            <Link to="/crear-cuenta" className="boton boton--primario boton--grande">
              Comenzar Ahora
            </Link>
            <a href="#como-funciona" className="boton boton--secundario boton--grande">
              Ver Cómo Funciona
            </a>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" style={{ padding: 'var(--espacio-2xl) 0', backgroundColor: 'var(--bg-principal)' }}>
        <div className="contenedor">
          <h2 className="texto-centrado" style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-2xl)' }}>
            ¿Por qué elegir PrepáraT?
          </h2>
          
          <div className="grid-tarjetas">
            <div className="tarjeta">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--espacio-md)' }}>🤖</div>
              <h3 className="tarjeta__titulo">IA Conversacional</h3>
              <p className="tarjeta__subtitulo">
                Entrevistas realistas con respuestas en tiempo real utilizando inteligencia artificial avanzada
              </p>
            </div>

            <div className="tarjeta">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--espacio-md)' }}>📊</div>
              <h3 className="tarjeta__titulo">Análisis Detallado</h3>
              <p className="tarjeta__subtitulo">
                Recibe feedback completo sobre tu desempeño, puntos fuertes y áreas de mejora
              </p>
            </div>

            <div className="tarjeta">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--espacio-md)' }}>🎯</div>
              <h3 className="tarjeta__titulo">Personalizable</h3>
              <p className="tarjeta__subtitulo">
                Crea entrevistas específicas para tu rol o usa nuestras plantillas predefinidas
              </p>
            </div>

            <div className="tarjeta">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--espacio-md)' }}>🎤</div>
              <h3 className="tarjeta__titulo">Por Voz</h3>
              <p className="tarjeta__subtitulo">
                Practica hablando naturalmente, como en una entrevista real
              </p>
            </div>

            <div className="tarjeta">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--espacio-md)' }}>⚡</div>
              <h3 className="tarjeta__titulo">Resultados Inmediatos</h3>
              <p className="tarjeta__subtitulo">
                Obtén tu evaluación y feedback al instante después de cada sesión
              </p>
            </div>

            <div className="tarjeta">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--espacio-md)' }}>💰</div>
              <h3 className="tarjeta__titulo">Modelo Freemium</h3>
              <p className="tarjeta__subtitulo">
                Practica gratis, paga solo si quieres acceso a análisis detallados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section id="como-funciona" style={{ padding: 'var(--espacio-2xl) 0' }}>
        <div className="contenedor">
          <h2 className="texto-centrado" style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-2xl)' }}>
            Cómo Funciona
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-2xl)', maxWidth: '800px', margin: '0 auto' }}>
            <div className="flex gap-lg" style={{ alignItems: 'flex-start' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-primario)', 
                color: 'var(--texto-claro)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: 'var(--fuente-xl)',
                fontWeight: '700',
                flexShrink: '0'
              }}>
                1
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
                  Crea tu Cuenta
                </h3>
                <p style={{ color: 'var(--texto-secundario)' }}>
                  Regístrate en segundos y accede a tu panel de control personalizado
                </p>
              </div>
            </div>

            <div className="flex gap-lg" style={{ alignItems: 'flex-start' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-primario)', 
                color: 'var(--texto-claro)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: 'var(--fuente-xl)',
                fontWeight: '700',
                flexShrink: '0'
              }}>
                2
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
                  Elige tu Entrevista
                </h3>
                <p style={{ color: 'var(--texto-secundario)' }}>
                  Selecciona entre entrevistas generadas por IA o crea preguntas personalizadas
                </p>
              </div>
            </div>

            <div className="flex gap-lg" style={{ alignItems: 'flex-start' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-primario)', 
                color: 'var(--texto-claro)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: 'var(--fuente-xl)',
                fontWeight: '700',
                flexShrink: '0'
              }}>
                3
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
                  Practica con IA
                </h3>
                <p style={{ color: 'var(--texto-secundario)' }}>
                  Responde las preguntas por voz y recibe feedback en tiempo real
                </p>
              </div>
            </div>

            <div className="flex gap-lg" style={{ alignItems: 'flex-start' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-primario)', 
                color: 'var(--texto-claro)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: 'var(--fuente-xl)',
                fontWeight: '700',
                flexShrink: '0'
              }}>
                4
              </div>
              <div>
                <h3 style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
                  Recibe tu Evaluación
                </h3>
                <p style={{ color: 'var(--texto-secundario)' }}>
                  Obtén resultados instantáneos y accede a análisis detallados si lo necesitas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" style={{ padding: 'var(--espacio-2xl) 0', backgroundColor: 'var(--bg-principal)' }}>
        <div className="contenedor">
          <h2 className="texto-centrado" style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-sm)' }}>
            Precios Simples y Justos
          </h2>
          <p className="texto-centrado" style={{ color: 'var(--texto-secundario)', marginBottom: 'var(--espacio-2xl)', fontSize: 'var(--fuente-lg)' }}>
            Practica gratis, paga solo por lo que necesitas
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--espacio-2xl)', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Plan Gratis */}
            <div className="tarjeta" style={{ textAlign: 'center' }}>
              <div className="tarjeta__encabezado">
                <h3 className="tarjeta__titulo">Gratuito</h3>
                <div style={{ fontSize: 'var(--fuente-4xl)', fontWeight: '700', margin: 'var(--espacio-lg) 0' }}>
                  0€<span style={{ fontSize: 'var(--fuente-base)', fontWeight: 'normal', color: 'var(--texto-secundario)' }}>/siempre</span>
                </div>
              </div>
              <div className="tarjeta__cuerpo">
                <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--espacio-md)' }}>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--color-exito)' }}>✓</span>
                    <span>Entrevistas ilimitadas</span>
                  </li>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--color-exito)' }}>✓</span>
                    <span>IA conversacional</span>
                  </li>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--color-exito)' }}>✓</span>
                    <span>Resultado básico (aprobado/no aprobado)</span>
                  </li>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--texto-secundario)' }}>✗</span>
                    <span style={{ color: 'var(--texto-secundario)' }}>Sin análisis detallado</span>
                  </li>
                </ul>
              </div>
              <div className="tarjeta__pie">
                <Link to="/crear-cuenta" className="boton boton--secundario boton--completo">
                  Comenzar Gratis
                </Link>
              </div>
            </div>

            {/* Plan Premium */}
            <div className="tarjeta" style={{ textAlign: 'center', border: '2px solid var(--color-primario)' }}>
              <div className="insignia insignia--primario" style={{ marginBottom: 'var(--espacio-md)' }}>
                Más Popular
              </div>
              <div className="tarjeta__encabezado">
                <h3 className="tarjeta__titulo">Premium</h3>
                <div style={{ fontSize: 'var(--fuente-4xl)', fontWeight: '700', margin: 'var(--espacio-lg) 0' }}>
                  9.99€<span style={{ fontSize: 'var(--fuente-base)', fontWeight: 'normal', color: 'var(--texto-secundario)' }}>/análisis</span>
                </div>
              </div>
              <div className="tarjeta__cuerpo">
                <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 'var(--espacio-md)' }}>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--color-exito)' }}>✓</span>
                    <span>Todo lo del plan gratuito</span>
                  </li>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--color-exito)' }}>✓</span>
                    <span>Análisis detallado completo</span>
                  </li>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--color-exito)' }}>✓</span>
                    <span>Recomendaciones personalizadas</span>
                  </li>
                  <li style={{ display: 'flex', gap: 'var(--espacio-sm)' }}>
                    <span style={{ color: 'var(--color-exito)' }}>✓</span>
                    <span>Métricas de progreso</span>
                  </li>
                </ul>
              </div>
              <div className="tarjeta__pie">
                <Link to="/crear-cuenta" className="boton boton--primario boton--completo">
                  Probar Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ padding: 'var(--espacio-2xl) 0', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'var(--texto-claro)' }}>
        <div className="contenedor">
          <h2 style={{ fontSize: 'var(--fuente-3xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
            ¿Listo para mejorar tus habilidades?
          </h2>
          <p style={{ fontSize: 'var(--fuente-lg)', marginBottom: 'var(--espacio-2xl)', opacity: '0.9' }}>
            Únete a miles de usuarios que ya están preparándose para sus entrevistas
          </p>
          <Link to="/crear-cuenta" className="boton boton--secundario boton--grande">
            Comenzar Ahora - Es Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--bg-oscuro)', color: 'var(--texto-claro)', padding: 'var(--espacio-2xl) 0' }}>
        <div className="contenedor">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--espacio-2xl)' }}>
            <div>
              <h3 style={{ fontSize: 'var(--fuente-xl)', fontWeight: '700', marginBottom: 'var(--espacio-md)' }}>
                PrepáraT
              </h3>
              <p style={{ color: 'var(--texto-secundario)' }}>
                Tu plataforma de preparación para entrevistas con IA
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: 'var(--espacio-md)' }}>Producto</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)' }}>
                <li><a href="#funcionalidades" style={{ color: 'var(--texto-secundario)' }}>Funcionalidades</a></li>
                <li><a href="#precios" style={{ color: 'var(--texto-secundario)' }}>Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: 'var(--espacio-md)' }}>Legal</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--espacio-sm)' }}>
                <li><a href="/terminos" style={{ color: 'var(--texto-secundario)' }}>Términos</a></li>
                <li><a href="/privacidad" style={{ color: 'var(--texto-secundario)' }}>Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: 'var(--espacio-2xl)', paddingTop: 'var(--espacio-lg)', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'var(--texto-secundario)' }}>
            <p>© 2025 PrepáraT. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PaginaPrincipal;
