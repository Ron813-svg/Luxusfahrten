import React from 'react';

const ModelCard = ({ model, onUpdate, onDelete, brands = [] }) => {
  if (!model) {
    return <div className="text-center text-muted">Cargando...</div>;
  }

  // Función para obtener el nombre de la marca
  const getBrandName = () => {
    // Si idBrand es un objeto (populated)
    if (typeof model.idBrand === 'object' && model.idBrand?.brandName) {
      return model.idBrand.brandName;
    }
    
    // Si idBrand es un string (ObjectId), buscar en el array de brands
    if (typeof model.idBrand === 'string' && brands.length > 0) {
      const brand = brands.find(b => b._id === model.idBrand);
      return brand?.brandName || 'Marca no encontrada';
    }
    
    return 'Sin marca';
  };

  return (
    <div className="card bg-dark text-white mb-3 shadow-sm" style={{ borderRadius: '12px' }}>
      <div className="card-body">
        <h5 className="card-title text-center">
          Modelo: <span className="text-info">{model.nameModel}</span>
        </h5>
        <p className="card-text text-center">
          Marca: <span className="text-warning">{getBrandName()}</span>
        </p>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={onUpdate}
          >
            Actualizar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;