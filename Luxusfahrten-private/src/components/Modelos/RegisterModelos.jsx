import React, { useEffect } from "react";
import toast from "react-hot-toast"; // ¡Importación agregada!

const RegisterModelos = ({
  id,
  idBrand,
  setIdBrand,
  nameModel,
  setNameModel,
  brands,
  handleSubmit,
  handleUpdate,
  cleanData,
  setActiveTab,
  fetchBrands,
}) => {
  // Cargar marcas al montar el componente
  useEffect(() => {
    if (fetchBrands) {
      fetchBrands();
    }
  }, [fetchBrands]);

  // Debug logs
  useEffect(() => {
    console.log("Estado actual en RegisterModelos:");
    console.log("id:", id);
    console.log("idBrand:", idBrand);
    console.log("nameModel:", nameModel);
  }, [id, idBrand, nameModel]);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("Enviando datos:");
    console.log("idBrand:", idBrand);
    console.log("nameModel:", nameModel);

    // Validación básica
    if (!idBrand || !nameModel.trim()) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const modelData = {
      idBrand,
      nameModel: nameModel.trim(),
    };

    if (id) {
      // Actualizar modelo existente
      handleUpdate({ 
        id, 
        ...modelData 
      });
    } else {
      // Crear nuevo modelo
      handleSubmit(modelData);
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
            Marca *
          </label>
          <select
            id="idBrand"
            className="form-select"
            value={idBrand || ""}
            onChange={(e) => setIdBrand(e.target.value)}
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
            Nombre del Modelo *
          </label>
          <input
            type="text"
            id="nameModel"
            className="form-control"
            placeholder="Ingrese el nombre del modelo"
            value={nameModel || ""}
            onChange={(e) => setNameModel(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button 
            type="submit" 
            className="btn btn-success"
          >
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