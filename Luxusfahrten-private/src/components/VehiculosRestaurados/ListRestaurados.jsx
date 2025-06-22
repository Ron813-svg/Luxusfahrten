import React from 'react';
import RestauradosCard from './RestauradosCard';

const ListRestaurados = ({
  vehiculosRes,
  onUpdateVehiculoRes,
  onDeleteVehiculoRes,
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
        Listado de vehículos restaurados
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

          {vehiculosRes && vehiculosRes.map((vehiculo) => (
            <div key={vehiculo._id} className="col-md-4">
              <RestauradosCard
                vehiculo={vehiculo}
                onUpdate={() => onUpdateVehiculoRes(vehiculo)}
                onDelete={() => onDeleteVehiculoRes(vehiculo._id)}
              />
            </div>
          ))}

          {(!vehiculosRes || vehiculosRes.length === 0) && !loading && (
            <div className="col-12 text-center py-5">
              <p>No hay vehículos restaurados registrados.</p>
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

export default ListRestaurados;