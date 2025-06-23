import React from 'react';
import VehiculoCard from './VehiculoCard';

const ListVehiculos = ({
  vehiculos,
  onUpdateVehiculo,
  onDeleteVehiculo,
  loading,
  setActiveTab,
  cleanData
}) => {

  const handleAddNew = () => {
    cleanData();
    setActiveTab('form');
  };

  return (
     <> 
      <h2 className="text-center fw-bold mb-4" style={{ color: "#fff" }}>
        Listado de vehículos
      </h2>
      <div style={{
        backgroundColor: '#5a5a5a',
        borderRadius: '10px',
        padding: '20px',
        color: 'white'
      }}>
        <div className="row g-4 justify-content-center">
          {loading && (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {vehiculos && vehiculos.map((vehiculo) => (
            <div key={vehiculo._id} className="col-md-4">
              <VehiculoCard
                vehiculo={vehiculo}
                onUpdate={() => onUpdateVehiculo(vehiculo)}
                onDelete={() => onDeleteVehiculo(vehiculo._id)}
              />
            </div>
          ))}

          {(!vehiculos || vehiculos.length === 0) && !loading && (
            <div className="col-12 text-center py-5">
              <p>No hay vehículos registrados.</p>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-light"
            onClick={handleAddNew}
            style={{ borderRadius: '4px' }}
          >
            Agregar
          </button>
        </div>
      </div>
    </>
  );
};

export default ListVehiculos;