import React from "react";

const ListModelos = ({
  models,
  onUpdateModel,
  onDeleteModel,
  loading,
  setActiveTab,
  cleanData,
  brands = [],
}) => {
  const handleAddNew = () => {
    cleanData();
    setActiveTab("form");
  };

  // Función para obtener el nombre de la marca
  const getBrandName = (model) => {
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
    <>
      <h2 className="text-center fw-bold mb-4" style={{ color: "#fff" }}>
        Listado de Modelos
      </h2>
      
      <div
        style={{
          backgroundColor: "#5a5a5a",
          borderRadius: "10px",
          padding: "20px",
          color: "white",
        }}
      >
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}

        {(!models || models.length === 0) && !loading && (
          <div className="text-center py-5">
            <p>No hay modelos registrados.</p>
          </div>
        )}

        {models && models.length > 0 && !loading && (
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
                      letterSpacing: "0.5px"
                    }}
                  >
                    Nombre Marca
                  </th>
                  <th 
                    scope="col" 
                    className="text-center fw-bold"
                    style={{ 
                      color: "#ffffff",
                      padding: "15px",
                      fontSize: "14px",
                      letterSpacing: "0.5px"
                    }}
                  >
                    Nombre Modelo
                  </th>
                  <th 
                    scope="col" 
                    className="text-center fw-bold"
                    style={{ 
                      color: "#ffffff",
                      padding: "15px",
                      fontSize: "14px",
                      letterSpacing: "0.5px"
                    }}
                  >
                    Editar
                  </th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr 
                    key={model._id}
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
                        fontSize: "14px",
                        fontWeight: "500"
                      }}
                    >
                      {getBrandName(model)}
                    </td>
                    <td 
                      className="text-center"
                      style={{ 
                        padding: "15px",
                        color: "#ffffff",
                        fontSize: "14px",
                        fontWeight: "500",
                        fontStyle: "italic"
                      }}
                    >
                      {model.nameModel}
                    </td>
                    <td 
                      className="text-center"
                      style={{ padding: "15px" }}
                    >
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm"
                          onClick={() => onUpdateModel(model)}
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
                          onClick={() => onDeleteModel(model._id)}
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
            Agregar Nuevo Modelo
          </button>
        </div>
      </div>
    </>
  );
};

export default ListModelos;