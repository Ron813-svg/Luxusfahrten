import React from 'react';

const VehiculoCard = ({ vehiculo, onUpdate, onDelete }) => {
  if (!vehiculo) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  const VehiculoImage = () => {
    const hasValidImage = vehiculo.image && vehiculo.image.trim() !== '';
    
    if (hasValidImage) {
      return (
        <img 
          src={vehiculo.image} 
          alt={`${vehiculo.idBrand?.brandName || ''} ${vehiculo.idModel?.nameModel || ''}`}
          className="img-fluid"
          style={{ maxHeight: '150px', objectFit: 'contain', width: '100%' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }
    
    return (
      <div 
        className="d-flex justify-content-center align-items-center bg-secondary"
        style={{ height: '150px', width: '100%' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-car-front text-white" viewBox="0 0 16 16">
          <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276ZM2.52 3.515A.5.5 0 0 1 3.006 3h9.988a.5.5 0 0 1 .485.515l.87 6.95a.5.5 0 0 1-.121.343l-.828 1.24A.5.5 0 0 1 12.984 12H3.016a.5.5 0 0 1-.416-.192l-.828-1.24a.5.5 0 0 1-.121-.343l.87-6.95Z"/>
        </svg>
      </div>
    );
  };

  return (
    <div className="card mb-4" style={{
      maxWidth: '320px',
      border: '1px solid #777',
      background: 'transparent',
      color: 'white'
    }}>
      <div className="text-center p-3">
        <VehiculoImage />
        <div 
          className="d-none justify-content-center align-items-center bg-secondary"
          style={{ height: '150px', width: '100%' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-car-front text-white" viewBox="0 0 16 16">
            <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17 1.247 0 2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276ZM2.52 3.515A.5.5 0 0 1 3.006 3h9.988a.5.5 0 0 1 .485.515l.87 6.95a.5.5 0 0 1-.121.343l-.828 1.24A.5.5 0 0 1 12.984 12H3.016a.5.5 0 0 1-.416-.192l-.828-1.24a.5.5 0 0 1-.121-.343l.87-6.95Z"/>
          </svg>
        </div>
      </div>
      
      <div className="p-3">
        <p className="mb-1"><strong>Marca:</strong> {vehiculo.idBrand?.brandName || 'No especificada'}</p>
        <p className="mb-1"><strong>Modelo:</strong> {vehiculo.idModel?.nameModel || 'No especificado'}</p>
        <p className="mb-1"><strong>Año:</strong> {vehiculo.year}</p>
        <p className="mb-1"><strong>Precio:</strong> ${vehiculo.price?.toLocaleString()}</p>
        <p className="mb-1"><strong>Tipo:</strong> {vehiculo.type}</p>
        <p className="mb-1"><strong>Color:</strong> {vehiculo.color}</p>
        <p className="mb-1"><strong>Disponibilidad:</strong> 
          <span className={`ms-1 ${vehiculo.availability === 'disponible' ? 'text-success' : vehiculo.availability === 'vendido' ? 'text-danger' : 'text-warning'}`}>
            {vehiculo.availability}
          </span>
        </p>
        <p className="mb-1"><strong>Especificaciones:</strong> {
          typeof vehiculo.specs === 'object'
            ? JSON.stringify(vehiculo.specs)
            : vehiculo.specs
        }</p>
        
        <div className="d-flex justify-content-between mt-3">
          <button 
            className="btn text-dark"
            onClick={() => onUpdate(vehiculo._id)}
            style={{ 
              backgroundColor: '#e9ecef', 
              borderRadius: '20px', 
              padding: '6px 12px', 
              fontSize: '14px',
              border: 'none'
            }}
          >
            Actualizar
          </button>
          <button 
            className="btn text-white"
            onClick={() => onDelete(vehiculo._id)}
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

export default VehiculoCard;