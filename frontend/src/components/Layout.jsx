import React from 'react';
import logo from '../assets/logo.png';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="shadow-sm py-3 border-bottom sticky-top" style={{ backgroundColor: '#f7f6f6' }}>
        <div className="container d-flex align-items-center " style={{ backgroundColor: '#f7f6f6' }}>
          <img src={logo} alt="Logo Control360" height="68" className="me-3" />
          <h1 className="m-0 fs-4 text-uppercase fw-bold text-azul2">
            Cotizador de productos en tiempo real
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow-1 py-4">
        <div className="container">{children}</div>
      </main>

      {/* Footer */}
      <footer
  className="text-center py-3 mt-5 shadow-sm"
  style={{ backgroundColor: 'var(--color-gris)' }}
>
  <p
    className="mb-0"
    style={{ color: 'var(--color-azul)', fontWeight: 500 }}
  >
    Control360 - Cotizador, desarrollado por{' '}
    <a
      href="https://www.weblogica.cl"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'var(--color-azul)', textDecoration: 'underline' }}
    >
      www.weblogica.cl
    </a>
  </p>
</footer>

    </div>
  );
};

export default Layout;
