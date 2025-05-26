import React, { useEffect } from "react";

const RegisterModelos = ({
  id,
  idBrand,
  setIdBrand,
  nameModel,
  setNameModel,
  brands, // Lista de marcas obtenida desde la base de datos
  handleSubmit, // Función para registrar un nuevo modelo
  handleUpdate, // Función para actualizar un modelo existente
  cleanData,
  setActiveTab,
  fetchBrands, // Función para obtener las marcas desde la base de datos
}) => {
  // Llamar a fetchBrands al montar el componente
  useEffect(() => {
    if (fetchBrands) {
      fetchBrands(); // Llamar a la función para cargar las marcas
    }
  }, [fetchBrands]);

  useEffect(() => {
    console.log("handleUpdate en RegisterModelos.jsx:", handleUpdate);
  }, [handleUpdate]);

  useEffect(() => {
    console.log("Estado actual en RegisterModelos.jsx:");
    console.log("id:", id);
    console.log("idBrand:", idBrand);
    console.log("nameModel:", nameModel);
  }, [id, idBrand, nameModel]); // Solo se ejecuta cuando cambian estas dependencias

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("idBrand:", idBrand);
    console.log("nameModel:", nameModel);

    if (!idBrand || !nameModel) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    if (id) {
      handleUpdate({ id, idBrand, nameModel }); // Llama a handleUpdate con los datos del modelo
    } else {
      handleSubmit({ idBrand, nameModel }); // Llama a handleSubmit con los datos del modelo
    }
  };

  const handleCancel = () => {
    cleanData();
    if (setActiveTab) {
      setActiveTab("list");
    }
  };

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: "600px",
        backgroundColor: "#343a40",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        color: "white",
      }}
    >
      <h2 className="text-center mb-4">
        {id ? "Actualizar Modelo" : "Registrar Modelo"}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="idBrand" className="form-label">
            Marca
          </label>
          <select
            id="idBrand"
            className="form-select"
            value={idBrand || ""} // Mostrar el valor de idBrand desde el estado
            onChange={(e) => setIdBrand(e.target.value)} // Actualizar el estado al cambiar el valor
            required
          >
            <option value="">Seleccione una marca</option>
            {Array.isArray(brands) &&
              brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="nameModel" className="form-label">
            Nombre del Modelo
          </label>
          <input
            type="text"
            id="nameModel"
            className="form-control"
            placeholder="Ingrese el nombre del modelo"
            value={nameModel || ""} // Mostrar el valor de nameModel desde el estado
            onChange={(e) => setNameModel(e.target.value)} // Actualizar el estado al cambiar el valor
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {id ? "Actualizar" : "Registrar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterModelos;
