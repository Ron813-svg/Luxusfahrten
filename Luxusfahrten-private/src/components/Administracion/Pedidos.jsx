import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrderModal from '../OrderModal'

const Pedidos = () => {
  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Lista de vehículos disponibles
  const vehiculosDisponibles = [
    'Huayra Roadster',
    'Chiron',
    '296 GTS',
    'Huracan',
    'Clase S',
    '911 Gt3',
    'Jesko Attack',
    'Aventador',
    'McLaren 720S',
    'Porsche Taycan'
  ];

  // Lista de clientes disponibles
  const clientesDisponibles = [
    'Juan Pérez',
    'María García',
    'Carlos López',
    'Ana Martínez',
    'Pedro Rodríguez',
    'Laura Fernández',
    'Miguel Torres',
    'Carmen Ruiz'
  ];

  // Métodos de pago disponibles
  const metodosPago = ['Tarjeta', 'Efectivo', 'Transferencia', 'Financiamiento'];

  // Estado inicial de pedidos con más datos
  const [pedidos, setPedidos] = useState([
    { 
      id: 1,
      vehiculo: 'Huayra Roadster', 
      cliente: 'Juan Pérez',
      pago: 'Tarjeta',
      fecha: '2025-10-24',
      total: '$3,400,000' 
    },
    { 
      id: 2,
      vehiculo: 'Chiron', 
      cliente: 'María García',
      pago: 'Transferencia',
      fecha: '2025-10-23',
      total: '$3,500,000' 
    },
    { 
      id: 3,
      vehiculo: '296 GTS', 
      cliente: 'Carlos López',
      pago: 'Financiamiento',
      fecha: '2025-10-22',
      total: '$458,000' 
    },
    { 
      id: 4,
      vehiculo: 'Huracan', 
      cliente: 'Ana Martínez',
      pago: 'Tarjeta',
      fecha: '2025-10-21',
      total: '$230,000' 
    },
    { 
      id: 5,
      vehiculo: 'Clase S', 
      cliente: 'Pedro Rodríguez',
      pago: 'Efectivo',
      fecha: '2025-10-20',
      total: '$180,000' 
    },
    { 
      id: 6,
      vehiculo: '911 Gt3', 
      cliente: 'Laura Fernández',
      pago: 'Tarjeta',
      fecha: '2025-10-19',
      total: '$160,000' 
    },
    { 
      id: 7,
      vehiculo: 'Jesko Attack', 
      cliente: 'Miguel Torres',
      pago: 'Transferencia',
      fecha: '2025-10-18',
      total: '$3,500,000' 
    }
  ]);

  // Funciones para el modal
  const openModal = (pedido = null) => {
    setEditingOrder(pedido);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  // Función para agregar un nuevo pedido
  const agregarPedido = (nuevoPedido) => {
    const pedidoConId = {
      ...nuevoPedido,
      id: Math.max(...pedidos.map(p => p.id)) + 1,
      fecha: new Date().toISOString().split('T')[0]
    };
    setPedidos([...pedidos, pedidoConId]);
    closeModal();
  };

  // Función para actualizar un pedido
  const actualizarPedido = (pedidoActualizado) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === pedidoActualizado.id ? pedidoActualizado : pedido
    ));
    closeModal();
  };

  // Función para eliminar un pedido
  const eliminarPedido = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
      setPedidos(pedidos.filter(pedido => pedido.id !== id));
    }
  };

  // Función para actualizar campos individuales
  const actualizarCampo = (id, campo, valor) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === id ? { ...pedido, [campo]: valor } : pedido
    ));
  };

  // Filtrar pedidos según el término de búsqueda
  const pedidosFiltrados = pedidos.filter(pedido =>
    pedido.vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pedido.total.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#2d2d2d', padding: '20px' }}>
      {/* Header con título y barra de búsqueda */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h2 className="text-white fw-bold mb-0 me-4">Pedidos</h2>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar pedido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: '#4a4a4a',
                border: '1px solid #5a5a5a',
                borderRadius: '20px',
                color: 'white',
                paddingLeft: '40px',
                width: '300px',
                height: '40px'
              }}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="bi bi-search position-absolute text-muted"
              style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
        </div>
        
        <button
          className="btn btn-light d-flex align-items-center"
          onClick={() => openModal()}
          style={{ 
            borderRadius: '6px',
            padding: '10px 20px',
            fontWeight: '500'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus me-2" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Agregar
        </button>
      </div>

      {/* Contenedor principal */}
      <div style={{
        backgroundColor: '#3a3a3a',
        borderRadius: '12px',
        padding: '24px',
        minHeight: '600px'
      }}>
        {pedidosFiltrados.length === 0 && searchTerm && (
          <div className="text-center py-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-search text-muted mb-3" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <p className="text-muted">No se encontraron pedidos que coincidan con "{searchTerm}"</p>
          </div>
        )}

        {pedidos.length === 0 && !searchTerm && (
          <div className="text-center py-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-clipboard-x text-muted mb-3" viewBox="0 0 16 16">
              <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L8 9.293l1.146-1.147a.5.5 0 0 1 .708.708Z"/>
            </svg>
            <p className="text-muted">No hay pedidos registrados.</p>
            <button
              className="btn btn-outline-light mt-3"
              onClick={() => openModal()}
            >
              Crear primer pedido
            </button>
          </div>
        )}

        {pedidosFiltrados.length > 0 && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">
                Mostrando {pedidosFiltrados.length} de {pedidos.length} pedidos
              </span>
            </div>

            {/* Tabla de pedidos */}
            <div className="table-responsive">
              <table className="table table-dark" style={{ backgroundColor: 'transparent' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #5a5a5a' }}>
                    <th className="text-white fw-semibold py-3" style={{ backgroundColor: 'transparent', border: 'none' }}>Vehículo</th>
                    <th className="text-white fw-semibold py-3" style={{ backgroundColor: 'transparent', border: 'none' }}>Cliente</th>
                    <th className="text-white fw-semibold py-3" style={{ backgroundColor: 'transparent', border: 'none' }}>Pago</th>
                    <th className="text-white fw-semibold py-3" style={{ backgroundColor: 'transparent', border: 'none' }}>Fecha</th>
                    <th className="text-white fw-semibold py-3" style={{ backgroundColor: 'transparent', border: 'none' }}>Total</th>
                    <th className="text-white fw-semibold py-3 text-center" style={{ backgroundColor: 'transparent', border: 'none' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosFiltrados.map((pedido, index) => (
                    <tr key={pedido.id} style={{ 
                      backgroundColor: index % 2 === 0 ? '#4a4a4a' : '#3a3a3a',
                      borderBottom: '1px solid #5a5a5a'
                    }}>
                      <td className="py-3" style={{ border: 'none' }}>
                        <select
                          value={pedido.vehiculo}
                          onChange={(e) => actualizarCampo(pedido.id, 'vehiculo', e.target.value)}
                          className="form-select form-select-sm"
                          style={{
                            backgroundColor: '#2d2d2d',
                            border: '1px solid #5a5a5a',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '14px'
                          }}
                        >
                          {vehiculosDisponibles.map(vehiculo => (
                            <option key={vehiculo} value={vehiculo} style={{ backgroundColor: '#2d2d2d', color: 'white' }}>
                              {vehiculo}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3" style={{ border: 'none' }}>
                        <select
                          value={pedido.cliente}
                          onChange={(e) => actualizarCampo(pedido.id, 'cliente', e.target.value)}
                          className="form-select form-select-sm"
                          style={{
                            backgroundColor: '#2d2d2d',
                            border: '1px solid #5a5a5a',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '14px'
                          }}
                        >
                          {clientesDisponibles.map(cliente => (
                            <option key={cliente} value={cliente} style={{ backgroundColor: '#2d2d2d', color: 'white' }}>
                              {cliente}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3" style={{ border: 'none' }}>
                        <select
                          value={pedido.pago}
                          onChange={(e) => actualizarCampo(pedido.id, 'pago', e.target.value)}
                          className="form-select form-select-sm"
                          style={{
                            backgroundColor: '#2d2d2d',
                            border: '1px solid #5a5a5a',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '14px'
                          }}
                        >
                          {metodosPago.map(metodo => (
                            <option key={metodo} value={metodo} style={{ backgroundColor: '#2d2d2d', color: 'white' }}>
                              {metodo}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3" style={{ border: 'none' }}>
                        <input
                          type="date"
                          value={pedido.fecha}
                          onChange={(e) => actualizarCampo(pedido.id, 'fecha', e.target.value)}
                          className="form-control form-control-sm"
                          style={{
                            backgroundColor: '#2d2d2d',
                            border: '1px solid #5a5a5a',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '14px'
                          }}
                        />
                      </td>
                      <td className="py-3" style={{ border: 'none' }}>
                        <input
                          type="text"
                          value={pedido.total}
                          onChange={(e) => actualizarCampo(pedido.id, 'total', e.target.value)}
                          className="form-control form-control-sm"
                          style={{
                            backgroundColor: '#2d2d2d',
                            border: '1px solid #5a5a5a',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '14px',
                            textAlign: 'right'
                          }}
                        />
                      </td>
                      <td className="py-3 text-center" style={{ border: 'none' }}>
                        <button 
                          className="btn btn-sm me-2"
                          onClick={() => openModal(pedido)}
                          style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            fontSize: '12px',
                            border: 'none'
                          }}
                        >
                          Actualizar
                        </button>
                        <button 
                          className="btn btn-sm"
                          onClick={() => eliminarPedido(pedido.id)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '4px 12px',
                            fontSize: '12px',
                            border: 'none'
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <OrderModal 
          onClose={closeModal}
          onSave={editingOrder ? actualizarPedido : agregarPedido}
          pedido={editingOrder}
          vehiculosDisponibles={vehiculosDisponibles}
          clientesDisponibles={clientesDisponibles}
          metodosPago={metodosPago}
        />
      )}
    </div>
  );
};

export default Pedidos;