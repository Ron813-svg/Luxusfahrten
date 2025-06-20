import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OrderCard.css';
import OrderModal from '../OrderModal'

const OrderCard = () => {
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
      fecha: '24/10/2025',
      total: '$3,400,000' 
    },
    { 
      id: 2,
      vehiculo: 'Chiron', 
      cliente: 'María García',
      pago: 'Transferencia',
      fecha: '23/10/2025',
      total: '$3,500,000' 
    },
    { 
      id: 3,
      vehiculo: '296 GTS', 
      cliente: 'Carlos López',
      pago: 'Financiamiento',
      fecha: '22/10/2025',
      total: '$458,000' 
    },
    { 
      id: 4,
      vehiculo: 'Huracan', 
      cliente: 'Ana Martínez',
      pago: 'Tarjeta',
      fecha: '21/10/2025',
      total: '$230,000' 
    },
    { 
      id: 5,
      vehiculo: 'Clase S', 
      cliente: 'Pedro Rodríguez',
      pago: 'Efectivo',
      fecha: '20/10/2025',
      total: '$180,000' 
    },
    { 
      id: 6,
      vehiculo: '911 Gt3', 
      cliente: 'Laura Fernández',
      pago: 'Tarjeta',
      fecha: '19/10/2025',
      total: '$160,000' 
    },
    { 
      id: 7,
      vehiculo: 'Jesko Attack', 
      cliente: 'Miguel Torres',
      pago: 'Transferencia',
      fecha: '18/10/2025',
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
      fecha: new Date().toLocaleDateString('es-ES')
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
    <div className="order-card-container">
      <div className="order-card-header">
        <input
          type="text"
          className="order-card-search"
          placeholder="Buscar pedido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="order-card-add-button" onClick={() => openModal()}>
          Agregar
        </button>
      </div>

      <div className="order-card-table-wrapper">
        <table className="order-card-table">
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Pago</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id}>
                <td>
                  <select
                    value={pedido.vehiculo}
                    onChange={(e) => actualizarCampo(pedido.id, 'vehiculo', e.target.value)}
                    className="table-select"
                  >
                    {vehiculosDisponibles.map(vehiculo => (
                      <option key={vehiculo} value={vehiculo}>
                        {vehiculo}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={pedido.cliente}
                    onChange={(e) => actualizarCampo(pedido.id, 'cliente', e.target.value)}
                    className="table-select"
                  >
                    {clientesDisponibles.map(cliente => (
                      <option key={cliente} value={cliente}>
                        {cliente}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={pedido.pago}
                    onChange={(e) => actualizarCampo(pedido.id, 'pago', e.target.value)}
                    className="table-select"
                  >
                    {metodosPago.map(metodo => (
                      <option key={metodo} value={metodo}>
                        {metodo}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    value={pedido.fecha.split('/').reverse().join('-')}
                    onChange={(e) => {
                      const fechaFormateada = e.target.value.split('-').reverse().join('/');
                      actualizarCampo(pedido.id, 'fecha', fechaFormateada);
                    }}
                    className="table-date-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={pedido.total}
                    onChange={(e) => actualizarCampo(pedido.id, 'total', e.target.value)}
                    className="table-total-input"
                  />
                </td>
                <td>
                  <button 
                    className="order-card-update-button"
                    onClick={() => openModal(pedido)}
                  >
                    Actualizar
                  </button>
                  <button 
                    className="order-card-delete-button"
                    onClick={() => eliminarPedido(pedido.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default OrderCard;