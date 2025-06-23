import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataVehicles = () => {
  const ApiVehicles = "http://localhost:4000/api/vehicles";
  const ApiBrands = "http://localhost:4000/api/brand";
  const ApiModels = "http://localhost:4000/api/models";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [idModel, setIdModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState("");
  const [availability, setAvailability] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const cleanData = () => {
    setId("");
    setIdBrand("");
    setIdModel("");
    setYear("");
    setPrice("");
    setType("");
    setColor("");
    setDescription("");
    setSpecs("");
    setAvailability("");
    setImage("");
    setError(null);
    setSuccess(null);
  };

  // Obtener vehículos
  const fetchVehicles = async () => {
    setLoading(true);
    try {
      console.log("🚗 Obteniendo lista de vehículos...");
      const response = await fetch(ApiVehicles);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Vehículos obtenidos:", data);
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching vehicles:", error);
      toast.error("Error al obtener la lista de vehículos");
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener marcas - MEJORADO
  const fetchBrands = async () => {
    try {
      console.log("🏷️ Obteniendo marcas...");
      const response = await fetch(ApiBrands);
      
      if (!response.ok) {
        console.error("❌ Error response brands:", response.status);
        return;
      }
      
      const data = await response.json();
      console.log("✅ Marcas obtenidas:", data);
      setBrands(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching brands:", error);
      toast.error("Error al cargar las marcas");
    }
  };

  // Obtener modelos - MEJORADO
  const fetchModels = async () => {
    try {
      console.log("📋 Obteniendo modelos...");
      const response = await fetch(ApiModels);
      
      if (!response.ok) {
        console.error("❌ Error response models:", response.status);
        return;
      }
      
      const data = await response.json();
      console.log("✅ Modelos obtenidos:", data);
      setModels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching models:", error);
      toast.error("Error al cargar los modelos");
    }
  };

  // useEffect principal - MEJORADO
  useEffect(() => {
    console.log("🔄 Iniciando carga de datos para vehículos...");
    
    // Ejecutar las funciones
    fetchVehicles();
    fetchBrands();
    fetchModels();
    
  }, []);

  // Debug useEffect para monitorear cambios
  useEffect(() => {
    console.log("📊 Estado actual - Brands:", brands.length, "Models:", models.length);
  }, [brands, models]);

  // Crear vehículo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("📝 Datos del formulario:", {
      idBrand,
      idModel,
      year,
      price,
      type,
      color,
      description,
      specs,
      availability,
      image: image ? "Archivo seleccionado" : "Sin imagen"
    });

    // Validación mejorada
    const requiredFields = [
      { field: idBrand, name: "Marca" },
      { field: idModel, name: "Modelo" },
      { field: year, name: "Año" },
      { field: price, name: "Precio" },
      { field: type, name: "Tipo" },
      { field: color, name: "Color" },
      { field: description, name: "Descripción" },
      { field: specs, name: "Especificaciones" },
      { field: availability, name: "Disponibilidad" }
    ];

    const missingFields = requiredFields.filter(item => !item.field || item.field.toString().trim() === "");
    
    if (missingFields.length > 0) {
      const missingNames = missingFields.map(item => item.name).join(", ");
      const errorMsg = `Campos faltantes: ${missingNames}`;
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("idBrand", idBrand);
      formData.append("idModel", idModel);
      formData.append("year", year);
      formData.append("price", price);
      formData.append("type", type);
      formData.append("color", color);
      formData.append("description", description);
      formData.append("specs", specs);
      formData.append("availability", availability);
      
      if (image && image instanceof File) {
        formData.append("image", image);
        console.log("📷 Imagen agregada al FormData");
      }

      console.log("🚀 Enviando datos al servidor...");

      const response = await fetch(ApiVehicles, {
        method: "POST",
        body: formData,
      });

      console.log("📡 Respuesta del servidor:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error del servidor:", errorData);
        throw new Error(errorData.message || "Error al registrar el vehículo");
      }

      const result = await response.json();
      console.log("✅ Vehículo creado:", result);

      toast.success("Vehículo registrado exitosamente");
      setSuccess("Vehículo registrado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchVehicles();
    } catch (error) {
      console.error("❌ Error al registrar:", error);
      setError(error.message);
      toast.error(error.message || "Error al registrar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar vehículo
  const deleteVehicle = async (vehicleId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      return;
    }

    try {
      console.log("🗑️ Eliminando vehículo con ID:", vehicleId);
      const response = await fetch(`${ApiVehicles}/${vehicleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el vehículo");
      }

      toast.success("Vehículo eliminado exitosamente");
      await fetchVehicles();
    } catch (error) {
      console.error("❌ Error deleting vehicle:", error);
      toast.error("Error al eliminar el vehículo");
    }
  };

  // Cargar datos para editar
  const handleUpdateVehicle = (vehicle) => {
    console.log("✏️ Cargando datos del vehículo para editar:", vehicle);
    
    setId(vehicle._id);
    setIdBrand(vehicle.idBrand?._id || "");
    setIdModel(vehicle.idModel?._id || "");
    setYear(vehicle.year?.toString() || "");
    setPrice(vehicle.price?.toString() || "");
    setType(vehicle.type || "");
    setColor(vehicle.color || "");
    setDescription(vehicle.description || "");
    setSpecs(vehicle.specs || "");
    setAvailability(vehicle.availability || "");
    setImage(vehicle.image || "");
    setError(null);
    setSuccess(null);
    
    setActiveTab("form");
  };

  // Actualizar vehículo
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!idBrand || !idModel || !year || !price || !type || !color || !description || !specs || !availability) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Actualizando vehículo con ID:", id);
      
      const hasNewImage = image instanceof File;
      
      let body;
      let headers = {};

      if (hasNewImage) {
        const formData = new FormData();
        formData.append('idBrand', idBrand);
        formData.append('idModel', idModel);
        formData.append('year', year);
        formData.append('price', price);
        formData.append('type', type);
        formData.append('color', color);
        formData.append('description', description);
        formData.append('specs', specs);
        formData.append('availability', availability);
        formData.append('image', image);
        
        body = formData;
      } else {
        const updatedVehicle = {
          idBrand,
          idModel,
          year: parseInt(year),
          price: parseFloat(price),
          type,
          color,
          description,
          specs,
          availability,
        };

        body = JSON.stringify(updatedVehicle);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${ApiVehicles}/${id}`, {
        method: "PUT",
        headers,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el vehículo");
      }

      toast.success("Vehículo actualizado exitosamente");
      setSuccess("Vehículo actualizado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchVehicles();
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      setError(error.message);
      toast.error(error.message || "Error al actualizar el vehículo");
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
    image,
    setImage,
    error,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    vehicles,
    setVehicles,
    brands,
    setBrands,
    models,
    setModels,
    cleanData,
    handleSubmit,
    fetchVehicles,
    fetchBrands,
    fetchModels,
    deleteVehicle,
    handleUpdateVehicle,
    handleUpdate,
  };
};

export default useDataVehicles;