import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestauradosCard from './RestauradosCard';
import useDataVehiculosRes from './hooks/useDataVehiculosRes';

const ListRestaurados = () => {
  const { vehiculosRes, fetchData, deleteVehiculoRes, handleUpdateVehiculoRes } = useDataVehiculosRes();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div style={{ backgroundColor: '#5a5a5a', borderRadius: '10px', padding: '20px', color: 'white' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vehículos Restaurados</h2>
        <button
          className="btn btn-light"
          onClick={() => navigate('/RegisterRestaurado/')}
          style={{ borderRadius: '4px' }}
        >
          Agregar
        </button>
      </div>
      <div className="row g-4">
        {vehiculosRes.map((vehiculo) => (
          <div key={vehiculo.id} className="col-md-4">
            <RestauradosCard
              vehiculo={vehiculo}
              onUpdate={() => handleUpdateVehiculoRes(vehiculo)}
              onDelete={() => deleteVehiculoRes(vehiculo.id)}
            />
          </div>
        ))}
        {vehiculosRes.length === 0 && (
          <div className="col-12 text-center py-5">
            <p>No hay vehículos restaurados registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRestaurados;