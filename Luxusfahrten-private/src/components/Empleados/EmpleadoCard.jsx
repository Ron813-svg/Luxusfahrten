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
          className="img-fluid rounded-circle"
          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          onError={(e) => {
            // Si la imagen falla al cargar, mostrar placeholder
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }
    
    // Placeholder cuando no hay imagen
    return (
      <div 
        className="d-flex justify-content-center align-items-center rounded-circle bg-secondary"
        style={{ width: '120px', height: '120px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person text-white" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
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
        <EmpleadoImage />
        {/* Placeholder oculto para casos de error en carga de imagen */}
        <div 
          className="d-none justify-content-center align-items-center rounded-circle bg-secondary"
          style={{ width: '120px', height: '120px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person text-white" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
          </svg>
        </div>
      </div>
      
      <div className="p-3">
        <p className="mb-1"><strong>Nombre:</strong> {empleado.name}</p>
        <p className="mb-1"><strong>Correo:</strong> {empleado.email}</p>
        <p className="mb-1"><strong>Teléfono:</strong> {empleado.telephone}</p>
        <p className="mb-1"><strong>Tipo Empleado:</strong> {empleado.employeeType}</p>
        
        <div className="d-flex justify-content-between mt-3">
          <button 
            className="btn text-dark"
            onClick={() => onUpdate(empleado._id)}
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
            onClick={() => onDelete(empleado._id)}
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

export default EmpleadoCard;