import React from 'react';
import ModelCard from './ModelosCard';

const ListModelos = ({
  models,
  onUpdateModel,
  onDeleteModel,
  loading,
  setActiveTab,
  cleanData
}) => {

  const handleAddNew = () => {
    cleanData(); // Limpiar datos antes de mostrar el formulario
    setActiveTab('form'); // Cambiar a la pestaña del formulario
  };

  return (
    <>
      <h2 className="text-center fw-bold mb-4" style={{ color: "#fff" }}>
        Listado de Modelos
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
              <p>Cargando...</p>
            </div>
          )}

          {models && models.map((model) => (
            <div key={model._id} className="col-md-4">
              <ModelCard
                model={model}
                onUpdate={() => onUpdateModel(model)}
                onDelete={() => onDeleteModel(model._id)}
              />
            </div>
          ))}

          {(!models || models.length === 0) && !loading && (
            <div className="col-12 text-center py-5">
              <p>No hay modelos registrados.</p>
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

export default ListModelos;