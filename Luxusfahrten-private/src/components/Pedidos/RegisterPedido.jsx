import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPedido = ({
  id,
  idVehiculo,
  setIdVehiculo,
  idCliente,
  setIdCliente,
  paymentMethod,
  setPaymentMethod,
  orderStatus,
  setOrderStatus,
  orderDate,
  setOrderDate,
  totalPrice,
  setTotalPrice,
  vehicles,
  clients,
  handleSubmit,
  cleanData,
  setActiveTab,
  loading,
  error,
  success
}) => {

  // Debug para ver el estado
  useEffect(() => {
    console.log("🔍 Estado del formulario de pedidos:", {
      vehiclesCount: vehicles?.length || 0,
      clientsCount: clients?.length || 0,
      selectedVehicle: idVehiculo,
      selectedClient: idCliente,
      loading,
      error
    });
  }, [vehicles, clients, idVehiculo, idCliente, loading, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`📝 Campo ${name} cambió a:`, value);
    
    switch(name) {
      case 'idVehiculo':
        setIdVehiculo(value);
        // Auto-calcular precio si se selecciona un vehículo
        if (value && vehicles) {
          const selectedVehicle = vehicles.find(v => v._id === value);
          if (selectedVehicle && selectedVehicle.price) {
            setTotalPrice(selectedVehicle.price.toString());
          }
        }
        break;
      case 'idCliente':
        setIdCliente(value);
        break;
      case 'paymentMethod':
        setPaymentMethod(value);
        break;
      case 'orderStatus':
        setOrderStatus(value);
        break;
      case 'orderDate':
        setOrderDate(value);
        break;
      case 'totalPrice':
        setTotalPrice(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Enviando formulario de pedido...");
    await handleSubmit(e);
  };

  const handleCancel = () => {
    cleanData();
    setActiveTab('list');
  };

  // Verificar si hay datos disponibles
  if (!vehicles || !clients) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando datos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#9E9E9E' }}>
      <div className="container p-4" style={{ backgroundColor: '#5a5a5a', borderRadius: '10px', maxWidth: '800px' }}>
        <h3 className="text-white text-center mb-4">
          {id ? 'Actualizar Pedido' : 'Crear Nuevo Pedido'}
        </h3>


        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="idVehiculo" className="form-label text-white">Vehículo *</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="idVehiculo"
                  name="idVehiculo"
                  value={idVehiculo || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="">Seleccione un vehículo</option>
                  {vehicles && vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.idBrand?.name || 'Marca'} {vehicle.idModel?.name || 'Modelo'} 
                      {vehicle.year && ` (${vehicle.year})`} - ${vehicle.price?.toLocaleString() || '0'}
                    </option>
                  ))}
                </select>
                {vehicles.length === 0 && (
                  <small className="text-warning">⚠️ No se pudieron cargar los vehículos</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label text-white">Método de Pago *</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="">Seleccione método de pago</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                  <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                  <option value="Financiamiento">Financiamiento</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="orderDate" className="form-label text-white">Fecha del Pedido *</label>
                <input 
                  type="date" 
                  className="form-control bg-white text-dark border-0" 
                  id="orderDate"
                  name="orderDate"
                  value={orderDate || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                />
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="idCliente" className="form-label text-white">Cliente *</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="idCliente"
                  name="idCliente"
                  value={idCliente || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="">Seleccione un cliente</option>
                  {clients && clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.name || 'Sin nombre'} {client.lastName || ''} 
                      {client.email && ` (${client.email})`}
                    </option>
                  ))}
                </select>
                {clients.length === 0 && (
                  <small className="text-warning">⚠️ No se pudieron cargar los clientes</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="orderStatus" className="form-label text-white">Estado del Pedido *</label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="orderStatus"
                  name="orderStatus"
                  value={orderStatus || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                >
                  <option value="">Seleccione el estado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Procesando">Procesando</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="En Preparación">En Preparación</option>
                  <option value="Listo para Entrega">Listo para Entrega</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="totalPrice" className="form-label text-white">Precio Total *</label>
                <input 
                  type="number" 
                  className="form-control bg-white text-dark border-0" 
                  id="totalPrice"
                  name="totalPrice"
                  value={totalPrice || ''}
                  onChange={handleChange}
                  placeholder="50000.00"
                  min="0"
                  step="0.01"
                  required
                  disabled={loading}
                  style={{ height: '40px' }}
                />
                <small className="text-white-50">El precio se auto-completa al seleccionar un vehículo</small>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
              style={{ width: '150px', height: '40px' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-light"
              disabled={loading}
              style={{ width: '200px', height: '40px' }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Procesando...
                </>
              ) : (
                id ? 'Actualizar Pedido' : 'Crear Pedido'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPedido;