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
          src={empleado.imageUrl || "https://thumbs.dreamstime.com/b/avatar-de-imagen-perfil-predeterminado-icono-usuario-persona-an%C3%B3nimo-iconos-masculino-y-marcador-posici%C3%B3n-fotograf%C3%ADa-hombre-272206807.jpg"} 
          alt={empleado.nombre}
          className="img-fluid rounded-circle"
          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
        />
      </div>
      
      <div className="p-3">
        <p className="mb-1"><strong>Nombre:</strong> {empleado.nombre}</p>
        <p className="mb-1"><strong>Correo:</strong> {empleado.correo}</p>
        <p className="mb-1"><strong>Teléfono:</strong> {empleado.telefono}</p>
        <p className="mb-1"><strong>Tipo Empleado:</strong> {empleado.tipoEmpleado}</p>
        
        <div className="d-flex justify-content-between mt-3">
          <button 
            className="btn text-dark"
            onClick={() => onUpdate(empleado.id)}
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
            onClick={() => onDelete(empleado.id)}
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