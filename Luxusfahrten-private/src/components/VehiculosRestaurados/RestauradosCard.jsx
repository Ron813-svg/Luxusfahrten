import React from 'react';

const RestauradosCard = ({ vehiculo, onUpdate, onDelete }) => {
  if (!vehiculo) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  const VehiculoImage = () => {
    const hasValidImage = vehiculo.image && vehiculo.image.trim() !== '';
    
    if (hasValidImage) {
      return (
        <img 
          src={vehiculo.image} 
          alt={`${vehiculo.idBrand?.name || ''} ${vehiculo.idModel?.name || ''}`}
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
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-wrench text-white" viewBox="0 0 16 16">
          <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.102a2.99 2.99 0 0 1 1.286 2.097c0 .319-.104.614-.292.851a2.99 2.99 0 0 1-2.097-1.286z"/>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-wrench text-white" viewBox="0 0 16 16">
            <path d="M.102 2.223A3.004 3.004 0 0 0 3.78 5.897l6.341 6.252A3.003 3.003 0 0 0 13 16a3 3 0 1 0-.851-5.878L5.897 3.781A3.004 3.004 0 0 0 2.223.102a2.99 2.99 0 0 1 1.286 2.097c0 .319-.104.614-.292.851a2.99 2.99 0 0 1-2.097-1.286z"/>
          </svg>
        </div>
      </div>
      
      <div className="p-3">
        <p className="mb-1"><strong>Marca:</strong> {vehiculo.idBrand?.name || 'No especificada'}</p>
        <p className="mb-1"><strong>Modelo:</strong> {vehiculo.idModel?.name || 'No especificado'}</p>
        <p className="mb-1"><strong>Año:</strong> {vehiculo.year}</p>
        <p className="mb-1"><strong>Precio:</strong> ${vehiculo.price?.toLocaleString()}</p>
        <p className="mb-1"><strong>Tipo:</strong> {vehiculo.type}</p>
        <p className="mb-1"><strong>Color:</strong> {vehiculo.color}</p>
        <p className="mb-1"><strong>Costo Restauración:</strong> ${vehiculo.restorationCost?.toLocaleString()}</p>
        <p className="mb-1"><strong>Disponibilidad:</strong> 
          <span className={`ms-1 ${vehiculo.availability === 'disponible' ? 'text-success' : vehiculo.availability === 'vendido' ? 'text-danger' : 'text-warning'}`}>
            {vehiculo.availability}
          </span>
        </p>
        
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

export default RestauradosCard;