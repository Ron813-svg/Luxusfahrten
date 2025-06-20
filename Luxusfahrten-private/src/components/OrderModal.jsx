import React, { useState, useEffect } from 'react';
import './OrderModal.css';

const OrderModal = ({ 
  onClose, 
  onSave, 
  pedido, 
  vehiculosDisponibles, 
  clientesDisponibles, 
  metodosPago 
}) => {
  const [formData, setFormData] = useState({
    vehiculo: '',
    cliente: '',
    pago: 'Tarjeta',
    total: ''
  });

  // Si estamos editando, llenar el formulario con los datos existentes
  useEffect(() => {
    if (pedido) {
      setFormData({
        vehiculo: pedido.vehiculo,
        cliente: pedido.cliente,
        pago: pedido.pago,
        total: pedido.total
      });
    }
  }, [pedido]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.vehiculo || !formData.cliente || !formData.total) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Si estamos editando, incluir el ID
    const pedidoParaGuardar = pedido 
      ? { ...formData, id: pedido.id, fecha: pedido.fecha }
      : formData;

    onSave(pedidoParaGuardar);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{pedido ? 'Actualizar Pedido' : 'Agregar Nuevo Pedido'}</h2>
          <button className="modal-close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="vehiculo">Vehículo *</label>
            <select
              id="vehiculo"
              name="vehiculo"
              value={formData.vehiculo}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un vehículo</option>
              {vehiculosDisponibles.map(vehiculo => (
                <option key={vehiculo} value={vehiculo}>
                  {vehiculo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cliente">Cliente *</label>
            <select
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un cliente</option>
              {clientesDisponibles.map(cliente => (
                <option key={cliente} value={cliente}>
                  {cliente}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pago">Método de Pago</label>
            <select
              id="pago"
              name="pago"
              value={formData.pago}
              onChange={handleChange}
            >
              {metodosPago.map(metodo => (
                <option key={metodo} value={metodo}>
                  {metodo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="total">Total *</label>
            <input
              type="text"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              placeholder="Ej: $230,000"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save-button">
              {pedido ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;