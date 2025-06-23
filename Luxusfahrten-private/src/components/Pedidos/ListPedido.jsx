import React from 'react';

const ListPedido = ({
  pedidos,
  onUpdatePedido,
  onDeletePedido,
  loading,
  setActiveTab,
  cleanData
}) => {

  const handleAddNew = () => {
    cleanData();
    setActiveTab('form');
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Función para formatear precio
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Función para obtener badge del estado
  const getStatusBadge = (status) => {
    let badgeClass = 'badge ';
    switch (status?.toLowerCase()) {
      case 'pendiente':
        badgeClass += 'bg-warning text-dark';
        break;
      case 'procesando':
        badgeClass += 'bg-info';
        break;
      case 'confirmado':
        badgeClass += 'bg-primary';
        break;
      case 'completado':
        badgeClass += 'bg-success';
        break;
      case 'entregado':
        badgeClass += 'bg-success';
        break;
      case 'cancelado':
        badgeClass += 'bg-danger';
        break;
      default:
        badgeClass += 'bg-secondary';
    }
    return badgeClass;
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0" style={{ color: "#fff" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-check me-2" viewBox="0 0 16 16">
            <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
          Gestión de Pedidos
        </h2>
        <button
          className="btn btn-light"
          onClick={handleAddNew}
          style={{ borderRadius: '8px', padding: '10px 20px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg me-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
          Nuevo Pedido
        </button>
      </div>

      <div style={{
        backgroundColor: '#5a5a5a',
        borderRadius: '10px',
        padding: '20px',
        color: 'white'
      }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando pedidos...</p>
          </div>
        ) : (
          <>
            {pedidos && pedidos.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr style={{ borderBottom: '2px solid #6c757d' }}>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hash me-2" viewBox="0 0 16 16">
                          <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.196-.547-.617-.547h-.969l.527-2.54h1.204c.421 0 .617-.234.617-.547 0-.312-.196-.547-.617-.547h-.969l.527-2.54c.062-.305-.172-.492-.469-.492-.305 0-.508.21-.508.5 0 .055.014.097.023.148l-.555 2.703H6.785l.527-2.54c.062-.305-.172-.492-.469-.492-.305 0-.508.21-.508.5 0 .055.014.097.023.148l-.555 2.703H4.598c-.421 0-.617.234-.617.547 0 .312.196.547.617.547h.969l-.527 2.54H4.836c-.421 0-.617.234-.617.547 0 .312.196.547.617.547h.969l-.527 2.54c-.062.305.172.492.469.492.305 0 .508-.21.508-.5 0-.055-.014-.097-.023-.148l.555-2.703H8.37l-.527 2.54Zm-.617-6.187H9.98l-.527 2.54H7.246l.527-2.54Z"/>
                        </svg>
                        Pedido
                      </th>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person me-2" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                        Cliente
                      </th>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-car-front me-2" viewBox="0 0 16 16">
                          <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276ZM2.52 3.515A.5.5 0 0 1 3.006 3h9.988a.5.5 0 0 1 .485.515l.87 6.95a.5.5 0 0 1-.121.343l-.828 1.24A.5.5 0 0 1 12.984 12H3.016a.5.5 0 0 1-.416-.192l-.828-1.24a.5.5 0 0 1-.121-.343l.87-6.95Z"/>
                        </svg>
                        Vehículo
                      </th>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card me-2" viewBox="0 0 16 16">
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zM1 7v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7H1z"/>
                        </svg>
                        Método Pago
                      </th>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-check me-2" viewBox="0 0 16 16">
                          <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                          <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        Términos/Seguro
                      </th>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-check me-2" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                        Estado
                      </th>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar me-2" viewBox="0 0 16 16">
                          <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                        </svg>
                        Precio Total
                      </th>
                      <th scope="col" style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear me-2" viewBox="0 0 16 16">
                          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido, index) => (
                      <tr key={pedido._id} style={{ 
                        borderBottom: '1px solid #495057',
                        transition: 'all 0.2s ease'
                      }}>
                        <td style={{ 
                          color: '#e9ecef', 
                          fontWeight: '500',
                          fontFamily: 'monospace' 
                        }}>
                          #{pedido._id?.slice(-6) || `P${String(index + 1).padStart(3, '0')}`}
                        </td>
                        <td style={{ color: '#e9ecef' }}>
                          <div>
                            <div style={{ fontWeight: '500' }}>
                              {pedido.idCliente?.name || 'N/A'} {pedido.idCliente?.lastName || ''}
                            </div>
                            {pedido.idCliente?.email && (
                              <small style={{ color: '#adb5bd' }}>
                                {pedido.idCliente.email}
                              </small>
                            )}
                          </div>
                        </td>
                        <td style={{ color: '#e9ecef' }}>
                          <div>
                            <div style={{ fontWeight: '500' }}>
                              {pedido.idVehiculo?.idBrand?.name || 'Marca'} {pedido.idVehiculo?.idModel?.name || 'Modelo'}
                            </div>
                            <small style={{ color: '#adb5bd' }}>
                              {pedido.idVehiculo?.year && `Año ${pedido.idVehiculo.year}`}
                              {pedido.idVehiculo?.color && ` • ${pedido.idVehiculo.color}`}
                            </small>
                          </div>
                        </td>
                        <td style={{ color: '#e9ecef' }}>
                          <span style={{ 
                            fontSize: '0.85rem',
                            backgroundColor: '#495057',
                            padding: '4px 8px',
                            borderRadius: '4px'
                          }}>
                            {pedido.metodoPago || 'N/A'}
                          </span>
                        </td>
                        <td style={{ color: '#e9ecef' }}>
                          <span className={`badge ${pedido.terminosYSeguro ? 'bg-success' : 'bg-danger'}`} style={{ 
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '12px'
                          }}>
                            {pedido.terminosYSeguro ? (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-lg me-1" viewBox="0 0 16 16">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                                Aceptado
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-x-lg me-1" viewBox="0 0 16 16">
                                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                                Pendiente
                              </>
                            )}
                          </span>
                        </td>
                        <td>
                          <span className={getStatusBadge(pedido.status)} style={{ 
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '12px'
                          }}>
                            {pedido.status || 'Sin estado'}
                          </span>
                        </td>
                        <td style={{ 
                          color: '#28a745', 
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {formatPrice(pedido.precioTotal)}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-outline-light btn-sm"
                              onClick={() => onUpdatePedido(pedido)}
                              title="Editar pedido"
                              style={{ 
                                borderRadius: '6px',
                                padding: '4px 8px'
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9.5L9 7.293V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.293L14.5 9.5zm1.586-3L10.5 4.207 4 10.707V11a1 1 0 0 0 1 1h.293L12.793 6.5z"/>
                              </svg>
                            </button>
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => onDeletePedido(pedido._id)}
                              title="Eliminar pedido"
                              style={{ 
                                borderRadius: '6px',
                                padding: '4px 8px'
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-inbox text-muted mb-3" viewBox="0 0 16 16">
                  <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.046A.5.5 0 0 1 .5 8.5V4a1 1 0 0 1 .8-.8l.975-.195A1 1 0 0 1 3.065 3h9.87a1 1 0 0 1 .79.205l.975.195A1 1 0 0 1 15.5 4v4.5a.5.5 0 0 1-.546.5z"/>
                </svg>
                <h5 className="text-muted">No hay pedidos registrados</h5>
                <p className="text-muted">Crea tu primer pedido haciendo clic en "Nuevo Pedido"</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListPedido;