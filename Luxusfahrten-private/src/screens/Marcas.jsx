import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import useDataBrand from '../components/Marcas/hooks/useDataMarcas';
import ListMarcas from '../components/Marcas/ListMarcas';
import RegisterMarcas from '../components/Marcas/RegisterMarcas';

const Marcas = () => {
  useEffect(() => {
    document.title = "Marcas";
  }, []);

  const {
    activeTab,
    setActiveTab,
    id,
    setId,
    brandName,
    setBrandName,
    errorBrand,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    brands,
    setBrands,
    cleanData,
    handleSubmit,
    fetchData,
    deleteBrand,
    handleUpdate,
    handleUpdateBrand,
  } = useDataBrand();

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
              Marcas
            </h1>
            <div className="d-flex border-bottom mb-4" style={{ borderColor: "#00fff7" }}></div>
            <ListMarcas
              brands={brands}
              onUpdateBrand={handleUpdateBrand}
              onDeleteBrand={deleteBrand}
              loading={loading}
              setActiveTab={setActiveTab}
              cleanData={cleanData}
            />
          </div>
        )}

        {activeTab === "form" && (
          <RegisterMarcas
            id={id}
            brandName={brandName}
            setBrandName={setBrandName}
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

export default Marcas;
