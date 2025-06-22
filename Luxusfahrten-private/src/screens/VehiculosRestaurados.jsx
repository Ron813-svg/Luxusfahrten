import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import useDataVehiculosRes from '../components/VehiculosRestaurados/hooks/useDataVehiculosRes';
import ListRestaurados from '../components/VehiculosRestaurados/ListRestaurados';
import RegisterRestaurado from '../components/VehiculosRestaurados/RegisterRestaurado';



const VehiculosRestaurados = () => {
  useEffect(() => {
    document.title = "Vehículos Restaurados";
  }, []);

  const {
    activeTab,
    setActiveTab,
    id,
    idBrand,
    setIdBrand,
    idModel,
    setIdModel,
    year,
    setYear,
    price,
    setPrice,
    type,
    setType,
    color,
    setColor,
    description,
    setDescription,
    specs,
    setSpecs,
    availability,
    setAvailability,
    restorationSpecs,
    setRestorationSpecs,
    restorationCost,
    setRestorationCost,
    image,
    setImage,
    error,
    success,
    loading,
    vehiculosRes,
    brands,
    models,
    cleanData,
    handleSubmit,
    deleteVehiculoRes,
    handleUpdate,
    handleUpdateVehiculoRes,
  } = useDataVehiculosRes();

  return (
    <div style={{ backgroundColor: '#9E9E9E', minHeight: '100vh' }}>
      <div className="container py-5">
        {activeTab === "list" && (
          <div
            className="card"
            style={{
              backgroundColor: '#5a5a5a',
              border: 'none',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
            }}
          >
            <h1 className="text-white text-center mb-4">Vehículos Restaurados</h1>
            <ListRestaurados
              vehiculosRes={vehiculosRes}
              onUpdateVehiculoRes={handleUpdateVehiculoRes}
              onDeleteVehiculoRes={deleteVehiculoRes}
              loading={loading}
              setActiveTab={setActiveTab}
              cleanData={cleanData}
            />
          </div>
        )}

        
        {activeTab === "form" && (
          <RegisterRestaurado
            id={id}
            idBrand={idBrand}
            setIdBrand={setIdBrand}
            idModel={idModel}
            setIdModel={setIdModel}
            year={year}
            setYear={setYear}
            price={price}
            setPrice={setPrice}
            type={type}
            setType={setType}
            color={color}
            setColor={setColor}
            description={description}
            setDescription={setDescription}
            specs={specs}
            setSpecs={setSpecs}
            availability={availability}
            setAvailability={setAvailability}
            restorationSpecs={restorationSpecs}
            setRestorationSpecs={setRestorationSpecs}
            restorationCost={restorationCost}
            setRestorationCost={setRestorationCost}
            image={image}
            setImage={setImage}
            brands={brands}
            models={models}
            handleSubmit={id ? handleUpdate : handleSubmit}
            cleanData={cleanData}
            setActiveTab={setActiveTab}
            loading={loading}
            error={error}
            success={success}
          />
        )}
      </div>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default VehiculosRestaurados;