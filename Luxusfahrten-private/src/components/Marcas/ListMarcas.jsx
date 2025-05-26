import React from 'react';
import BrandCard from './MarcasCard';

const ListMarcas = ({
  brands,
  onUpdateBrand,
  onDeleteBrand,
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
        Listado de marcas
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

          {brands && brands.map((brand) => (
            <div key={brand._id} className="col-md-4">
              <BrandCard
                brand={brand}
                onUpdate={() => onUpdateBrand(brand)}
                onDelete={() => onDeleteBrand(brand._id)}
              />
            </div>
          ))}

          {(!brands || brands.length === 0) && !loading && (
            <div className="col-12 text-center py-5">
              <p>No hay marcas registradas.</p>
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

export default ListMarcas;