import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmpleadoCard from './EmpleadoCard';

const ListEmpleados = ({ empleados, onUpdateEmpleado, onDeleteEmpleado }) => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/RegisterEmpleado/');
  };

  return (
    <div style={{ 
      backgroundColor: '#5a5a5a', 
      borderRadius: '10px', 
      padding: '20px', 
      color: 'white' 
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Empleados</h2>
      </div>
      
      <div className="row g-4">
        {empleados.map((empleado) => (
          <div key={empleado.id} className="col-md-4">
            <EmpleadoCard 
              empleado={empleado} 
              onUpdate={() => onUpdateEmpleado(empleado.id)} 
              onDelete={() => onDeleteEmpleado(empleado.id)}
            />
          </div>
        ))}
        
        {empleados.length === 0 && (
          <div className="col-12 text-center py-5">
            <p>No hay empleados registrados.</p>
          </div>
        )}
      </div>
      
      <div className="d-flex justify-content-end mt-4">
        <button 
          className="btn btn-light" 
          onClick={() => navigate('/RegisterEmpleado/')}
          style={{ borderRadius: '4px' }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ListEmpleados;