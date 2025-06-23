import React from 'react';

const PedidoCard = ({ pedido, onUpdate, onDelete }) => {
  if (!pedido) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  // Función para formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
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

  // Función para obtener color del estado
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pendiente':
        return 'text-warning';
      case 'procesando':
        return 'text-info';
      case 'completado':
        return 'text-success';
      case 'cancelado':
        return 'text-danger';
      default:
        return 'text-secondary';
    }
  };

  return (
    <div className="card mb-4" style={{
      maxWidth: '350px',
      border: '1px solid #777',
      background: 'transparent',
      color: 'white'
    }}>
      <div className="card-header text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
        <h6 className="mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-receipt me-2" viewBox="0 0 16 16">
            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
            <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
          </svg>
          Pedido #{pedido._id?.slice(-6) || 'N/A'}
        </h6>
      </div>
      
      <div className="p-3">
        <div className="mb-2">
          <strong>Cliente:</strong> 
          <span className="ms-1">
            {pedido.idCliente?.name || 'Cliente no disponible'}
          </span>
        </div>
        
        <div className="mb-2">
          <strong>Vehículo:</strong> 
          <span className="ms-1">
            {pedido.idVehiculo?.idBrand?.name || 'Marca'} {pedido.idVehiculo?.idModel?.name || 'Modelo'} 
            {pedido.idVehiculo?.year && ` (${pedido.idVehiculo.year})`}
          </span>
        </div>
        
        <div className="mb-2">
          <strong>Método de pago:</strong> 
          <span className="ms-1">{pedido.paymentMethod || 'No especificado'}</span>
        </div>
        
        <div className="mb-2">
          <strong>Estado:</strong> 
          <span className={`ms-1 fw-bold ${getStatusColor(pedido.orderStatus)}`}>
            {pedido.orderStatus || 'Sin estado'}
          </span>
        </div>
        
        <div className="mb-2">
          <strong>Fecha:</strong> 
          <span className="ms-1">{formatDate(pedido.orderDate)}</span>
        </div>
        
        <div className="mb-3">
          <strong>Total:</strong> 
          <span className="ms-1 text-success fw-bold">
            {formatPrice(pedido.totalPrice)}
          </span>
        </div>
        
        <div className="d-flex justify-content-between">
          <button 
            className="btn text-dark"
            onClick={() => onUpdate(pedido._id)}
            style={{ 
              backgroundColor: '#e9ecef', 
              borderRadius: '20px', 
              padding: '6px 12px', 
              fontSize: '14px',
              border: 'none'
            }}
          >
            Editar
          </button>
          <button 
            className="btn text-white"
            onClick={() => onDelete(pedido._id)}
            style={{ 
              backgroundColor: '#d9534f', 
              borderRadius: '20px', 
              padding: '6px 12px', 
              fontSize: '14px',
              border: 'none'
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidoCard;