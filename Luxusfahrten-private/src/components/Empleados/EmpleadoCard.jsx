import React from 'react';

const EmpleadoCard = ({ empleado, onUpdate, onDelete }) => {
  return (
    <div className="card mb-4" style={{ 
      maxWidth: '320px', 
      border: '1px solid #777', 
      background: 'transparent', 
      color: 'white' 
    }}>
      <div className="text-center p-3">
        <img 
          src={empleado.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"} 
          alt={empleado.name}
          className="img-fluid rounded-circle"
          style={{ 
            width: '120px', 
            height: '120px', 
            objectFit: 'cover',
            border: '3px solid #00fff7'
          }}
        />
      </div>
      
      <div className="p-3">
        <h5 className="mb-2 text-center" style={{ color: '#00fff7' }}>
          {empleado.name}
        </h5>
        <p className="mb-1"><strong>Puesto:</strong> {empleado.employeeType}</p>
        <p className="mb-1"><strong>Email:</strong> {empleado.email}</p>
        <p className="mb-1"><strong>Teléfono:</strong> {empleado.telephone}</p>
        <p className="mb-1"><strong>Fecha de ingreso:</strong> {empleado.actualDate}</p>
        <p className="mb-3"><strong>Dirección:</strong> {empleado.address}</p>
        
        <div className="d-flex justify-content-between">
          <button 
            className="btn text-dark"
            onClick={() => onUpdate(empleado)}
            style={{ 
              backgroundColor: '#00fff7', 
              borderRadius: '20px', 
              padding: '8px 16px', 
              fontSize: '14px',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            Actualizar
          </button>
          <button 
            className="btn text-white"
            onClick={() => onDelete(empleado.id)}
            style={{ 
              backgroundColor: '#d9534f', 
              borderRadius: '20px', 
              padding: '8px 16px', 
              fontSize: '14px',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoCard;