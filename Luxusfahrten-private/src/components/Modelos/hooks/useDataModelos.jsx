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
  const [brands, setBrands] = useState([]); // Estado para las marcas

  const cleanData = () => {
    setId("");
    setIdBrand("");
    setNameModel("");
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
      setBrands(data); // Guardar las marcas en el estado
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
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
      const response = await fetch(ApiModels, {
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
      fetchData(); // Actualizar la lista de modelos
      setActiveTab("list"); // Volver a la lista
    } catch (error) {
      setError(error.message);
      toast.error("Ocurrió un error al registrar el modelo");
    }
  };

  // Cargar datos para editar
  const handleUpdateModel = (model) => {
    console.log("Cargando datos del modelo:", model);
  
    setId(model._id);
    setIdBrand(model.idBrand);
    setNameModel(model.nameModel);
    setActiveTab("form");
  };

  // Cargar datos de la marca para editar
  const handleUpdateBrand = (brand) => {
    console.log("Cargando datos de la marca:", brand); // Para debug
  
    setId(brand._id); // Establecer el ID de la marca en el estado
    setBrandName(brand.brandName); // Establecer el nombre de la marca en el estado
    setError(null); // Limpiar errores previos
    setSuccess(null); // Limpiar mensajes de éxito previos
  
    // Cambiar a la pestaña del formulario
    setActiveTab("form");
  };
  
  // Actualizar marca
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!brandName) {
      setError("El nombre de la marca es obligatorio");
      toast.error("El nombre de la marca es obligatorio");
      return;
    }
  
    try {
      setLoading(true); // Mostrar indicador de carga
      const body = JSON.stringify({ brandName });
      const response = await fetch(`${ApiBrands}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar la marca");
      }
  
      toast.success("Marca actualizada");
      setSuccess("Marca actualizada correctamente");
      cleanData(); // Limpiar los datos del formulario
      setId(""); // Limpiar el ID de la marca
      setActiveTab("list"); // Volver a la lista de marcas
      fetchData(); // Actualizar la lista de marcas
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar la marca");
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  useEffect(() => {
    fetchData();
    fetchBrands(); // Llamar a fetchBrands para cargar las marcas
  }, []);

  // Eliminar modelo
  const deleteModel = async (id) => {
    try {
      const response = await fetch(`${ApiModels}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el modelo");
      }

      toast.success("Modelo eliminado");
      fetchData(); // Actualizar la lista de modelos
    } catch (error) {
      console.error("Error eliminando el modelo:", error);
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
    error,
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
    handleSubmit, // Ahora está definido
    handleUpdateModel,
    handleUpdateBrand,
    handleUpdate,
    deleteModel,
  };
};

export default useDataModelos;