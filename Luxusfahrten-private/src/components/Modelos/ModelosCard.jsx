import React from 'react';

const ModelCard = ({ model, onUpdate, onDelete }) => {
  if (!model) {
    return <div className="text-center text-muted">Cargando...</div>;
  }

  return (
    <div className="card bg-dark text-white mb-3 shadow-sm" style={{ borderRadius: '12px' }}>
      <div className="card-body">
        <h5 className="card-title text-center">
          Modelo: <span className="text-info">{model.nameModel}</span>
        </h5>
        <p className="card-text text-center">
          Marca: <span className="text-warning">{model.idBrand?.brandName || 'Sin marca'}</span>
        </p>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onUpdate(model)}
          >
            Actualizar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(model._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;