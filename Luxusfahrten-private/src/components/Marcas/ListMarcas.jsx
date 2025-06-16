import React from 'react';

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
        Listado de Marcas
      </h2>
      
      <div style={{
        backgroundColor: '#5a5a5a',
        borderRadius: '10px',
        padding: '20px',
        color: 'white'
      }}>
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}

        {(!brands || brands.length === 0) && !loading && (
          <div className="text-center py-5">
            <p>No hay marcas registradas.</p>
          </div>
        )}

        {brands && brands.length > 0 && !loading && (
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr style={{ backgroundColor: "#404040" }}>
                  <th 
                    scope="col" 
                    className="text-center fw-bold"
                    style={{ 
                      color: "#ffffff",
                      padding: "15px",
                      fontSize: "14px",
                      letterSpacing: "0.5px",
                      width: "70%"
                    }}
                  >
                    Nombre de la Marca
                  </th>
                  <th 
                    scope="col" 
                    className="text-center fw-bold"
                    style={{ 
                      color: "#ffffff",
                      padding: "15px",
                      fontSize: "14px",
                      letterSpacing: "0.5px",
                      width: "30%"
                    }}
                  >
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand, index) => (
                  <tr 
                    key={brand._id}
                    style={{ 
                      backgroundColor: index % 2 === 0 ? "#6a6a6a" : "#5a5a5a",
                      borderBottom: "1px solid #777"
                    }}
                  >
                    <td 
                      className="text-center"
                      style={{ 
                        padding: "15px",
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: "600",
                        letterSpacing: "0.5px"
                      }}
                    >
                      {brand.brandName}
                    </td>
                    <td 
                      className="text-center"
                      style={{ padding: "15px" }}
                    >
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm"
                          onClick={() => onUpdateBrand(brand)}
                          style={{
                            backgroundColor: "#28a745",
                            border: "none",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            minWidth: "80px"
                          }}
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => onDeleteBrand(brand._id)}
                          style={{
                            backgroundColor: "#dc3545",
                            border: "none",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            minWidth: "80px"
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-light fw-bold"
            onClick={handleAddNew}
            style={{ 
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "14px"
            }}
          >
            Agregar Nueva Marca
          </button>
        </div>
      </div>
    </>
  );
};

export default ListMarcas;