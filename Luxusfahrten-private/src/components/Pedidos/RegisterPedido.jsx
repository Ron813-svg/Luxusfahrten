import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPedido = ({
  id,
  idVehiculo,
  setIdVehiculo,
  idCliente,
  setIdCliente,
  metodoPago,
  setMetodoPago,
  terminosYSeguro,
  setTerminosYSeguro,
  precioTotal,
  setPrecioTotal,
  status,
  setStatus,
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
    const { name, value, type, checked } = e.target;
    console.log(`📝 Campo ${name} cambió a:`, type === 'checkbox' ? checked : value);
    
    switch(name) {
      case 'idVehiculo':
        setIdVehiculo(value);
        // Auto-calcular precio si se selecciona un vehículo
        if (value && vehicles) {
          const selectedVehicle = vehicles.find(v => v._id === value);
          if (selectedVehicle && selectedVehicle.price) {
            setPrecioTotal(selectedVehicle.price.toString());
          }
        }
        break;
      case 'idCliente':
        setIdCliente(value);
        break;
      case 'metodoPago':
        setMetodoPago(value);
        break;
      case 'terminosYSeguro':
        setTerminosYSeguro(checked);
        break;
      case 'precioTotal':
        setPrecioTotal(value);
        break;
      case 'status':
        setStatus(value);
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
      <div className="container p-4" style={{ backgroundColor: '#5a5a5a', borderRadius: '10px', maxWidth: '700px' }}>
        <h3 className="text-white text-center mb-4">
          {id ? 'Actualizar Pedido' : 'Crear Nuevo Pedido'}
        </h3>

        {/* Mostrar errores */}
        {error && (
          <div className="alert alert-danger mb-3" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Mostrar éxito */}
        {success && (
          <div className="alert alert-success mb-3" role="alert">
            <strong>Éxito:</strong> {success}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="row">
            {/* Columna izquierda */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="idCliente" className="form-label text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person me-2" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                  </svg>
                  Cliente *
                </label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="idCliente"
                  name="idCliente"
                  value={idCliente || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '45px' }}
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
                <label htmlFor="metodoPago" className="form-label text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card me-2" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zM1 7v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7H1z"/>
                  </svg>
                  Método de Pago *
                </label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="metodoPago"
                  name="metodoPago"
                  value={metodoPago || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '45px' }}
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
                <label htmlFor="precioTotal" className="form-label text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar me-2" viewBox="0 0 16 16">
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                  </svg>
                  Precio Total *
                </label>
                <input 
                  type="number" 
                  className="form-control bg-white text-dark border-0" 
                  id="precioTotal"
                  name="precioTotal"
                  value={precioTotal || ''}
                  onChange={handleChange}
                  placeholder="50000.00"
                  min="0"
                  step="0.01"
                  required
                  disabled={loading}
                  style={{ height: '45px' }}
                />
                <small className="text-white-50">Se auto-completa al seleccionar un vehículo</small>
              </div>
            </div>
            
            {/* Columna derecha */}
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="idVehiculo" className="form-label text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-car-front me-2" viewBox="0 0 16 16">
                    <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276ZM2.52 3.515A.5.5 0 0 1 3.006 3h9.988a.5.5 0 0 1 .485.515l.87 6.95a.5.5 0 0 1-.121.343l-.828 1.24A.5.5 0 0 1 12.984 12H3.016a.5.5 0 0 1-.416-.192l-.828-1.24a.5.5 0 0 1-.121-.343l.87-6.95Z"/>
                  </svg>
                  Vehículo *
                </label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="idVehiculo"
                  name="idVehiculo"
                  value={idVehiculo || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '45px' }}
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
                <label htmlFor="status" className="form-label text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-check me-2" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                  </svg>
                  Estado del Pedido *
                </label>
                <select 
                  className="form-select bg-white text-dark border-0" 
                  id="status"
                  name="status"
                  value={status || ''}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ height: '45px' }}
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
            </div>
          </div>

          {/* Términos y seguro */}
          <div className="mb-4">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="terminosYSeguro"
                name="terminosYSeguro"
                checked={terminosYSeguro || false}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <label className="form-check-label text-white" htmlFor="terminosYSeguro">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-check me-2" viewBox="0 0 16 16">
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                  <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                Acepto los términos y condiciones, y deseo contratar seguro *
              </label>
            </div>
            <small className="text-white-50">
              Es obligatorio aceptar los términos para procesar el pedido
            </small>
          </div>
          
          {/* Botones */}
          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
              style={{ width: '150px', height: '45px' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg me-2" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-light"
              disabled={loading || !terminosYSeguro}
              style={{ width: '200px', height: '45px' }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg me-2" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                  {id ? 'Actualizar Pedido' : 'Crear Pedido'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPedido;