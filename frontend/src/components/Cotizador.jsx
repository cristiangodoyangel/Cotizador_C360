import React, { useState } from 'react';

const seccionesIniciales = [
  { id: 1, nombre: 'Producto 1', precio: 20000 },
  { id: 2, nombre: 'Producto 2', precio: 15000 },
  { id: 3, nombre: 'Producto 3', precio: 18000 },
  { id: 4, nombre: 'Producto 4', precio: 18000 },
  { id: 5, nombre: 'Producto 5', precio: 18000 },
  { id: 6, nombre: 'Producto 6', precio: 18000 }
];

const Cotizador = () => {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [mostrarToast, setMostrarToast] = useState(false);

  const toggleSeleccion = (seccion) => {
    const existe = seleccionadas.some(s => s.id === seccion.id);
    if (existe) {
      setSeleccionadas(seleccionadas.filter(s => s.id !== seccion.id));
    } else {
      setSeleccionadas([...seleccionadas, seccion]);
    }
  };

  const total = seleccionadas.reduce((acc, s) => acc + s.precio, 0);

  const enviar = () => {
    // Aquí puedes llamar a tu backend
    console.log('Enviando datos:', seleccionadas);
    setMostrarToast(true);
    setTimeout(() => setMostrarToast(false), 3000);
  };

  return (
    <div className="w-100">
      <h2 className="mb-4 text-primary text-center">
        <i className="bi bi-calculator-fill me-2"></i>
        Seleccione Productos
      </h2>

      <div className="list-group mb-4">
        {seccionesIniciales.map(seccion => (
          <label key={seccion.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={seleccionadas.some(s => s.id === seccion.id)}
                onChange={() => toggleSeleccion(seccion)}
              />
              {seccion.nombre}
            </div>
            <span className="badge bg-secondary">
              ${seccion.precio.toLocaleString('es-CL')}
            </span>
          </label>
        ))}
      </div>

      <h4 className="mb-3 text-center">
        Total: <span className="text-success">${total.toLocaleString('es-CL')}</span>
      </h4>

      <div className="text-center">
        <button className="btn btn-success" onClick={enviar}>
          📤 Enviar al backend
        </button>
      </div>

      {/* Toast */}
      <div
        className={`toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-3 ${mostrarToast ? 'show' : 'hide'}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            ✅ Cotización enviada con éxito.
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setMostrarToast(false)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Cotizador;
