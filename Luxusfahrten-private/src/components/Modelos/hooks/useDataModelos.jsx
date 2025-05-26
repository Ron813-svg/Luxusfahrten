import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataModel = () => {
  const ApiRegister = "http://localhost:4000/api/models";
  const ApiModels = "http://localhost:4000/api/models";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [nameModel, setNameModel] = useState("");
  const [errorModel, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);

  const cleanData = () => {
    setIdBrand("");
    setNameModel("");
    setId("");
  };

  // Registrar modelo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idBrand || !nameModel) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const body = JSON.stringify({ idBrand, nameModel });
      const response = await fetch(ApiRegister, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar el modelo");
      }

      toast.success("Modelo registrado");
      setSuccess("Modelo registrado correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Ocurrió un error al registrar el modelo");
    } finally {
      setLoading(false);
    }
  };

  // Obtener modelos
  const fetchData = async () => {
    try {
      const response = await fetch(ApiModels);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar modelo
  const deleteModel = async (id) => {
    try {
      const response = await fetch(`${ApiModels}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete model");
      }

      toast.success("Modelo eliminado");
      fetchData();
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  // Cargar datos para editar
  const handleUpdateModel = (model) => {
    console.log("Cargando datos del modelo:", model); // Para debug

    setId(model._id);
    setIdBrand(model.idBrand);
    setNameModel(model.nameModel);
    setError(null);
    setSuccess(null);

    // Cambiar a la pestaña del formulario
    setActiveTab("form");
  };

  // Actualizar modelo
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({ idBrand, nameModel });
      const response = await fetch(`${ApiModels}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el modelo");
      }

      toast.success("Modelo actualizado");
      setSuccess("Modelo actualizado correctamente");
      cleanData();
      setId("");
      setActiveTab("list");
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar el modelo");
    } finally {
      setLoading(false);
    }
  };

  return {
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
    cleanData,
    handleSubmit,
    fetchData,
    deleteModel,
    handleUpdate,
    handleUpdateModel,
  };
};

export default useDataModel;