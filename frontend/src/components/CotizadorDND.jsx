import React, { useState, useEffect } from 'react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const productosBase = [
  { id: '1', nombre: 'Producto 1', precio: 20000 },
  { id: '2', nombre: 'Producto 2', precio: 15000 },
  { id: '3', nombre: 'Producto 3', precio: 18000 },
  { id: '4', nombre: 'Producto 4', precio: 18000 },
];

const CotizadorDND = () => {
  const [productos] = useState(productosBase);
  const [seleccionados, setSeleccionados] = useState([]);
  const [esMovilActual, setEsMovilActual] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setEsMovilActual(/Mobi|Android|iPhone|iPad/i.test(userAgent));
  }, []);

  const handleDrop = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto && !seleccionados.find(p => p.id === id)) {
      setSeleccionados([...seleccionados, producto]);
    }
  };

  const eliminarProducto = (id) => {
    setSeleccionados(seleccionados.filter(p => p.id !== id));
  };

  useEffect(() => {
    if (esMovilActual) return;
    const dropEl = document.getElementById('zona-cotizacion');
    if (!dropEl) return;
    return dropTargetForElements({
      element: dropEl,
      getData: () => ({ type: 'producto-dropzone' }),
      onDrop: ({ source }) => {
        if (source?.data?.id) handleDrop(source.data.id);
      },
    });
  }, [seleccionados, esMovilActual]);

  useEffect(() => {
    if (esMovilActual) return;
    const limpiezas = [];
    const ids = productos.map(p => p.id);
    ids.forEach((id) => {
      const el = document.getElementById(`prod-${id}`);
      if (el) {
        const cleanup = draggable({
          element: el,
          getInitialData: () => ({ id }),
        });
        limpiezas.push(cleanup);
      }
    });
    return () => {
      limpiezas.forEach(c => c?.());
    };
  }, [esMovilActual]);

  const generarMensajeWhatsApp = (items) => {
    let mensaje = 'Hola, me interesa esta cotización:\n\n';
    items.forEach((item, i) => {
      mensaje += `${i + 1}. ${item.nombre} - $${item.precio.toLocaleString('es-CL')}\n`;
    });
    const total = items.reduce((acc, p) => acc + p.precio, 0);
    mensaje += `\nTotal: $${total.toLocaleString('es-CL')}`;
    return mensaje;
  };

  return (
    
    <div className="container py-4" style={{ backgroundColor: '#f7f6f6' }}>
     <h5 className="mb-3 text-azul2">Productos disponibles</h5>
      <div className="row">
       {/* Productos disponibles */}
<div className="col-md-6 mb-4" style={{ backgroundColor: 'var(--color-gris)' }}>
  <h5 className="mb-3 text-azul2">Arrastra o agrega productos para cotizar su carro de cotización</h5>
  <ul className="list-group">
    {productos.map(producto => (
      <li
        key={producto.id}
        id={!esMovilActual ? `prod-${producto.id}` : undefined}
        className="list-group-item d-flex justify-content-between align-items-center"
        style={{
          cursor: !esMovilActual ? 'grab' : 'default',
        }}
      >
        <span className="fs-5">{producto.nombre}</span>
        <div className="d-flex align-items-center">
          <span
            className="badge fs-6 me-2"
            style={{
              backgroundColor: 'var(--color-gris)',
              color: 'var(--color-azul)',
              fontWeight: '600',
              borderRadius: '8px',
              padding: '6px 12px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
            }}
          >
            ${producto.precio.toLocaleString('es-CL')}
          </span>
          {esMovilActual && (
     <button
     className="btn-azul"
     onClick={() => handleDrop(producto.id)}
   >
     +
   </button>
   
       
          )}
        </div>
      </li>
    ))}
  </ul>
</div>


        {/* Cotización */}
       {/* Cotización */}
<div className="col-md-6">
  <h5 className="mb-3">Carro de Cotización</h5>
  <div
    id="zona-cotizacion"
    className="p-4"
    style={{
      backgroundColor: '#ffffff',
      border: '2px dashed var(--color-amarillo)',
      borderRadius: '12px',
      minHeight: '350px'
    }}
  >
    {seleccionados.length === 0 && (
      <p className="text-muted"> - Arrastra y/o agrega productos para cotizar</p>
    )}
    {seleccionados.map(producto => (
      <div
        key={producto.id}
        className="d-flex justify-content-between align-items-center bg-light mb-3 px-3 py-3"
        style={{
          borderRadius: '12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}
      >
        <span className="fs-5">{producto.nombre}</span>
        <div>
        <strong
  className="me-3 fs-6"
  style={{ color: 'var(--color-azul)', fontWeight: 700 }}
>

            ${producto.precio.toLocaleString('es-CL')}
          </strong>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => eliminarProducto(producto.id)}
            title="Eliminar"
          >
            &times;
          </button>
        </div>
      </div>
    ))}

{seleccionados.length > 0 && (
  <>
    <div className="mt-4 text-end fs-5">
      Total:{' '}
      <span
        style={{
          color: 'var(--color-azul) !important',
          fontWeight: '700'
        }}
      >
        ${seleccionados.reduce((acc, p) => acc + p.precio, 0).toLocaleString('es-CL')}
      </span>
    </div>

    <div className="mt-4 text-center">
      <a
        href={`https://wa.me/56941853607?text=${encodeURIComponent(
          generarMensajeWhatsApp(seleccionados)
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={{
          backgroundColor: 'var(--color-amarillo)',
          color: 'var(--color-azul) !important',
          fontWeight: '600',
          padding: '12px 28px',
          borderRadius: '8px',
          fontSize: '1rem',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        QUIERO ESTA COTIZACIÓN
      </a>
    </div>
  </>
)}

  </div>
</div>

      </div>
    </div>
  );
};

export default CotizadorDND;
