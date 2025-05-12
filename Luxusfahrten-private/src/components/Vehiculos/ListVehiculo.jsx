import React from 'react';
import { useNavigate } from 'react-router-dom';
import VehiculoCard from './VehiculoCard';

const ListVehiculos = ({ vehiculos, onUpdateVehiculo, onDeleteVehiculo }) => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/RegisterVehiculo/');
  };

  return (
    <div style={{ 
      backgroundColor: '#5a5a5a', 
      borderRadius: '10px', 
      padding: '20px', 
      color: 'white' 
    }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vehículos</h2>
      </div>
      
      <div className="row g-4">
        {vehiculos.map((vehiculo) => (
          <div key={vehiculo.id} className="col-md-4">
            <VehiculoCard 
              vehiculo={vehiculo} 
              onUpdate={() => onUpdateVehiculo(vehiculo.id)} 
              onDelete={() => onDeleteVehiculo(vehiculo.id)}
            />
          </div>
        ))}
        
        {vehiculos.length === 0 && (
          <div className="col-12 text-center py-5">
            <p>No hay vehículos registrados.</p>
          </div>
        )}
      </div>
      
      <div className="d-flex justify-content-end mt-4">
        <button 
          className="btn btn-light" 
          onClick={() => navigate('/RegisterVehiculo/')}
          style={{ borderRadius: '4px' }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ListVehiculos;