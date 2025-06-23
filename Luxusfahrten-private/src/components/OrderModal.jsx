import React, { useState, useEffect } from 'react';

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
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        zIndex: 1050 
      }}
      onClick={onClose}
    >
      <div 
        className="position-relative"
        style={{
          backgroundColor: '#3a3a3a',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div 
          className="d-flex justify-content-between align-items-center p-4"
          style={{ borderBottom: '1px solid #5a5a5a' }}
        >
          <h3 className="text-white fw-bold mb-0">
            {pedido ? 'Actualizar Pedido' : 'Agregar Nuevo Pedido'}
          </h3>
          <button 
            className="btn btn-link text-white p-0"
            onClick={onClose}
            style={{ 
              textDecoration: 'none',
              fontSize: '24px',
              lineHeight: '1'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        
        {/* Formulario */}
        <div className="p-4" style={{ maxHeight: 'calc(90vh - 140px)', overflowY: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Vehículo */}
              <div className="col-12">
                <label className="form-label text-white mb-2">
                  Vehículo <span className="text-danger">*</span>
                </label>
                <select
                  name="vehiculo"
                  value={formData.vehiculo}
                  onChange={handleChange}
                  required
                  className="form-select"
                  style={{
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                >
                  <option value="">Seleccione el vehículo</option>
                  {vehiculosDisponibles.map(vehiculo => (
                    <option key={vehiculo} value={vehiculo} style={{ backgroundColor: '#4a4a4a', color: 'white' }}>
                      {vehiculo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cliente */}
              <div className="col-12">
                <label className="form-label text-white mb-2">
                  Cliente <span className="text-danger">*</span>
                </label>
                <select
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                  required
                  className="form-select"
                  style={{
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                >
                  <option value="">Seleccione el cliente</option>
                  {clientesDisponibles.map(cliente => (
                    <option key={cliente} value={cliente} style={{ backgroundColor: '#4a4a4a', color: 'white' }}>
                      {cliente}
                    </option>
                  ))}
                </select>
              </div>

              {/* Método de pago */}
              <div className="col-12">
                <label className="form-label text-white mb-2">Método de pago</label>
                <select
                  name="pago"
                  value={formData.pago}
                  onChange={handleChange}
                  className="form-select"
                  style={{
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                >
                  {metodosPago.map(metodo => (
                    <option key={metodo} value={metodo} style={{ backgroundColor: '#4a4a4a', color: 'white' }}>
                      {metodo}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha del pedido */}
              <div className="col-12">
                <label className="form-label text-white mb-2">Fecha del pedido</label>
                <input
                  type="date"
                  className="form-control"
                  style={{
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>

              {/* Total */}
              <div className="col-12">
                <label className="form-label text-white mb-2">
                  Total <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  placeholder="$"
                  required
                  className="form-control"
                  style={{
                    backgroundColor: '#4a4a4a',
                    border: '1px solid #5a5a5a',
                    borderRadius: '8px',
                    color: 'white',
                    height: '48px'
                  }}
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div 
              className="d-flex justify-content-end gap-3 mt-4 pt-4"
              style={{ borderTop: '1px solid #5a5a5a' }}
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                style={{ 
                  minWidth: '120px',
                  height: '48px',
                  borderRadius: '8px',
                  borderColor: '#6c757d',
                  color: '#6c757d'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-light"
                style={{ 
                  minWidth: '120px',
                  height: '48px',
                  borderRadius: '8px',
                  fontWeight: '500'
                }}
              >
                {pedido ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;