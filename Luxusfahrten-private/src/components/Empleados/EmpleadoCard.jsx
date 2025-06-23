import React from 'react';

const EmpleadoCard = ({ empleado, onUpdate, onDelete }) => {
  if (!empleado) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  // Componente para manejar la imagen con fallback
  const EmpleadoImage = () => {
    const hasValidImage = empleado.image && empleado.image.trim() !== '';
    
    if (hasValidImage) {
      return (
        <img 
          src={empleado.image} 
          alt={empleado.name}
          className="rounded-circle"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }
    
    return (
      <div 
        className="d-flex justify-content-center align-items-center rounded-circle"
        style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: '#6c757d',
          border: '2px solid #495057'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
        </svg>
      </div>
    );
  };

  return (
    <div className="mb-3" style={{
      backgroundColor: '#4a4a4a',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid #5a5a5a'
    }}>
      <div className="row align-items-center">
        {/* Imagen del empleado */}
        <div className="col-2">
          <EmpleadoImage />
          <div 
            className="d-none justify-content-center align-items-center rounded-circle"
            style={{ 
              width: '80px', 
              height: '80px', 
              backgroundColor: '#6c757d',
              border: '2px solid #495057'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg>
          </div>
        </div>

        {/* Información del empleado */}
        <div className="col-6">
          <div className="row mb-2">
            <div className="col-6">
              <small className="text-white">Nombre</small>
              <div className="text-white fw-medium">{empleado.name}</div>
            </div>
            <div className="col-6">
              <small className="text-white">Correo</small>
              <div className="text-white fw-medium">{empleado.email}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <small className="text-white">Teléfono</small>
              <div className="text-white fw-medium">{empleado.telephone}</div>
            </div>
            <div className="col-6">
              <small className="text-white">Tipo</small>
              <div className="text-white fw-medium">{empleado.employeeType}</div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="col-4 text-end">
          <button 
            className="btn me-2"
            onClick={() => onUpdate(empleado._id)}
            style={{ 
              backgroundColor: '#6c757d', 
              color: 'white',
              borderRadius: '6px', 
              padding: '8px 16px', 
              fontSize: '14px',
              border: 'none'
            }}
          >
            Actualizar
          </button>
          <button 
            className="btn"
            onClick={() => onDelete(empleado._id)}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white',
              borderRadius: '6px', 
              padding: '8px 16px', 
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

export default EmpleadoCard;