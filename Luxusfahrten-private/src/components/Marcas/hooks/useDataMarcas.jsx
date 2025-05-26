import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataBrand = () => {
  const ApiRegister = "http://localhost:4000/api/brand";
  const ApiBrands = "http://localhost:4000/api/brand";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [brandName, setBrandName] = useState("");
  const [errorBrand, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  const cleanData = () => {
    setBrandName("");
    setId("");
  };

  // Registrar marca
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName) {
      setError("El nombre de la marca es obligatorio");
      toast.error("El nombre de la marca es obligatorio");
      return;
    }

    try {
      const body = JSON.stringify({ brandName });
      const response = await fetch(ApiRegister, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar la marca");
      }

      toast.success("Marca registrada");
      setSuccess("Marca registrada correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Ocurrió un error al registrar la marca");
    } finally {
      setLoading(false);
    }
  };

  // Obtener marcas
  const fetchData = async () => {
    try {
      const response = await fetch(ApiBrands);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar marca
  const deleteBrand = async (id) => {
    try {
      const response = await fetch(`${ApiBrands}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete brand");
      }

      toast.success("Marca eliminada");
      fetchData();
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  // Cargar datos para editar
  const handleUpdateBrand = (brand) => {
    console.log("Cargando datos de la marca:", brand); // Para debug

    setId(brand._id);
    setBrandName(brand.brandName);
    setError(null);
    setSuccess(null);

    // Cambiar a la pestaña del formulario
    setActiveTab("form");
  };

  // Actualizar marca
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({ brandName });
      const response = await fetch(`${ApiBrands}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la marca");
      }

      toast.success("Marca actualizada");
      setSuccess("Marca actualizada correctamente");
      cleanData();
      setId("");
      setActiveTab("list");
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar la marca");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};

export default useDataBrand;