import React from 'react';

const BrandCard = ({ brand, onUpdate, onDelete }) => {
  if (!brand) {
    return <div className="text-center text-muted">Cargando...</div>;
  }

  return (
    <div className="card bg-dark text-white mb-3 shadow-sm" style={{ borderRadius: '12px' }}>
      <div className="card-body">
        <h5 className="card-title text-center">{brand.brandName}</h5>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onUpdate(brand)}
          >
            Actualizar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(brand._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;