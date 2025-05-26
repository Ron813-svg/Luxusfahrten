import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import useDataModel from '../components/Modelos/hooks/useDataModelos';
import ListModelos from '../components/Modelos/ListModelos';
import RegisterModelos from '../components/Modelos/RegisterModelos';

const Modelos = () => {
  useEffect(() => {
    document.title = "Modelos";
  }, []);

  const {
    activeTab,
    setActiveTab,
    id,
    setId,
    idBrand,
    setIdBrand,
    nameModel,
    setNameModel,
    errorModel,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    models,
    setModels,
    brands, // Lista de marcas para el select
    fetchBrands, // Función para obtener las marcas
    cleanData,
    handleSubmit,
    fetchData,
    deleteModel,
    handleUpdate,
    handleUpdateModel,
  } = useDataModel();

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#9E9E9E",
        padding: "40px 0",
      }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "900px",
        }}
      >
        {activeTab === "list" && (
          <div
            className="shadow-lg"
            style={{
              background: "#5a5a5a",
              border: "none",
              borderRadius: "1.5rem",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              color: "#fff",
              padding: "2rem",
            }}
          >
            <h1
              className="fw-bold mb-4 text-center"
              style={{
                color: "#fff",
                letterSpacing: "2px",
              }}
            >
              Modelos
            </h1>
            <div className="d-flex border-bottom mb-4" style={{ borderColor: "#00fff7" }}></div>
            <ListModelos
              models={models}
              onUpdateModel={handleUpdateModel}
              onDeleteModel={deleteModel}
              loading={loading}
              setActiveTab={setActiveTab}
              cleanData={cleanData}
            />
          </div>
        )}

        {activeTab === "form" && (
          <RegisterModelos
          id={id}
          idBrand={idBrand}
          setIdBrand={setIdBrand}
          nameModel={nameModel}
          setNameModel={setNameModel}
          brands={brands} // Pasar las marcas al formulario
          fetchBrands={fetchBrands} // Pasar la función para cargar marcas
          handleSubmit={id ? handleUpdate : handleSubmit}
          handleUpdate={handleUpdate}
          cleanData={cleanData}
          setActiveTab={setActiveTab}
          />
        )}
      </div>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
      />
    </div>
  );
};

export default Modelos;