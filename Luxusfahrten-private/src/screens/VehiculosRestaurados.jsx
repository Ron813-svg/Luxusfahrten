import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestauradosCard from '../components/VehiculosRestaurados/RestauradosCard';
import useDataVehiculosRes from '../components/VehiculosRestaurados/hooks/useDataVehiculosRes';

const VehiculosRestaurados = () => {
  const {
    vehiculosRes, // Lista de vehículos restaurados
    fetchData, // Función para obtener los datos
    deleteVehiculoRes, // Función para eliminar un vehículo
    handleUpdateVehiculoRes, // Función para cargar datos de un vehículo para actualizar
  } = useDataVehiculosRes();

  const navigate = useNavigate();

  // Obtener los datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: '#9E9E9E', minHeight: '100vh' }}>
      <div className="container py-5">
        <div
          className="card"
          style={{
            backgroundColor: '#5a5a5a',
            border: 'none',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white mb-0">Vehículos Restaurados</h2>
            <button
              className="btn btn-light"
              onClick={() => navigate('/RegisterRestaurado')}
              style={{ borderRadius: '4px' }}
            >
              Agregar Vehículo
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
                <p className="text-white">No hay vehículos restaurados registrados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiculosRestaurados;