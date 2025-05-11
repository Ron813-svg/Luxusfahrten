import React from 'react';

const RestauradosCard = ({ vehiculo, onUpdate, onDelete }) => {
  return (
    <div className="card mb-4" style={{ 
      maxWidth: '320px', 
      border: '1px solid #777', 
      background: 'transparent', 
      color: 'white' 
    }}>
      <div className="text-center p-3">
        <img 
          src={vehiculo.imageUrl || "https://image-proxy.kws.kaavan.es/i/1200-630/noticias/f7ef0696-7422-4823-9dc8-bf7f3d4d3a80/medias/35918.jpg?format=webp"} 
          alt={vehiculo.modelo}
          className="img-fluid"
          style={{ maxHeight: '150px', objectFit: 'contain' }}
        />
      </div>
      
      <div className="p-3">
        <p className="mb-1"><strong>Modelo:</strong> {vehiculo.modelo}</p>
        <p className="mb-1"><strong>Año:</strong> {vehiculo.anio}</p>
        <p className="mb-1"><strong>Transmisión:</strong> {vehiculo.transmision}</p>
        
        <p className="mb-3"><strong>Descripción:</strong> {vehiculo.descripcion}</p>
        
        <div className="d-flex justify-content-between">
          <button 
            className="btn text-dark"
            onClick={() => onUpdate(vehiculo.id)}
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
            onClick={() => onDelete(vehiculo.id)}
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