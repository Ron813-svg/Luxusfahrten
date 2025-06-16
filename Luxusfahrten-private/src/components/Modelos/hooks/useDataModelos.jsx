import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataModelos = () => {
  const ApiModels = "http://localhost:4000/api/models";
  const ApiBrands = "http://localhost:4000/api/brand";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [nameModel, setNameModel] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);

  const cleanData = () => {
    setId("");
    setIdBrand("");
    setNameModel("");
    setError(null);
    setSuccess(null);
  };

  // Obtener modelos
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(ApiModels);
      if (!response.ok) {
        throw new Error("Error al obtener los modelos");
      }
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models:", error);
      setError("Error al cargar los modelos");
    } finally {
      setLoading(false);
    }
  };

  // Obtener marcas
  const fetchBrands = async () => {
    try {
      const response = await fetch(ApiBrands);
      if (!response.ok) {
        throw new Error("Error al obtener las marcas");
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError("Error al cargar las marcas");
    }
  };

  // Registrar nuevo modelo
  const handleSubmit = async (modelData) => {
    const { idBrand: brandId, nameModel: modelName } = modelData;

    if (!brandId || !modelName) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      const body = JSON.stringify({ 
        idBrand: brandId, 
        nameModel: modelName 
      });
      
      const response = await fetch(ApiModels, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar el modelo");
      }

      const newModel = await response.json();
      console.log("Modelo registrado:", newModel);
      
      toast.success("Modelo registrado correctamente");
      setSuccess("Modelo registrado correctamente");
      cleanData();
      fetchData(); // Actualizar la lista
      setActiveTab("list");
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(error.message);
      toast.error(error.message || "Error al registrar el modelo");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar modelo existente
  const handleUpdateModel = (model) => {
    console.log("Cargando datos del modelo para editar:", model);
    
    setId(model._id);
    setIdBrand(model.idBrand._id || model.idBrand); // Manejar tanto populate como ObjectId
    setNameModel(model.nameModel);
    setActiveTab("form");
  };

  // Función para actualizar modelo
  const handleUpdate = async (modelData) => {
    const { id: modelId, idBrand: brandId, nameModel: modelName } = modelData;

    if (!brandId || !modelName) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      const body = JSON.stringify({ 
        idBrand: brandId, 
        nameModel: modelName 
      });
      
      const response = await fetch(`${ApiModels}/${modelId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el modelo");
      }

      const updatedModel = await response.json();
      console.log("Modelo actualizado:", updatedModel);
      
      toast.success("Modelo actualizado correctamente");
      setSuccess("Modelo actualizado correctamente");
      cleanData();
      fetchData(); // Actualizar la lista
      setActiveTab("list");
    } catch (error) {
      console.error("Error al actualizar:", error);
      setError(error.message);
      toast.error(error.message || "Error al actualizar el modelo");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar modelo
  const deleteModel = async (modelId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este modelo?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${ApiModels}/${modelId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el modelo");
      }

      toast.success("Modelo eliminado correctamente");
      fetchData(); // Actualizar la lista
    } catch (error) {
      console.error("Error eliminando el modelo:", error);
      toast.error("Error al eliminar el modelo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBrands();
  }, []);

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    idBrand,
    setIdBrand,
    nameModel,
    setNameModel,
    errorModel: error, // Mantengo el nombre original para compatibilidad
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    models,
    setModels,
    brands,
    setBrands,
    cleanData,
    fetchData,
    fetchBrands,
    handleSubmit,
    handleUpdateModel,
    handleUpdate,
    deleteModel,
  };
};

export default useDataModelos;