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
      console.log("🏷️ Fetching brands from:", ApiBrands);
      const response = await fetch(ApiBrands);
      
      console.log("📡 Brands response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("✅ Raw brands data:", data);
      
      if (Array.isArray(data) && data.length > 0) {
        setBrands(data);
        console.log("✅ Brands loaded successfully:", data.length, "marcas");
        
        // Mostrar las marcas en consola para debug
        data.forEach((brand, index) => {
          console.log(`   ${index + 1}. ${brand.name || brand.brandName || 'Sin nombre'} (ID: ${brand._id})`);
        });
      } else {
        console.log("⚠️ No brands data received or empty array");
        setBrands([]);
      }
    } catch (error) {
      console.error("❌ Error fetching brands:", error);
      toast.error("Error al cargar las marcas: " + error.message);
      setBrands([]);
    }
  };

  // Obtener modelos - MEJORADO
  const fetchModels = async () => {
    try {
      console.log("📋 Fetching models from:", ApiModels);
      const response = await fetch(ApiModels);
      
      console.log("📡 Models response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("✅ Raw models data:", data);
      
      if (Array.isArray(data) && data.length > 0) {
        setModels(data);
        console.log("✅ Models loaded successfully:", data.length, "modelos");
        
        // Mostrar los modelos en consola para debug
        data.forEach((model, index) => {
          console.log(`   ${index + 1}. ${model.name || model.modelName || 'Sin nombre'} (ID: ${model._id})`);
        });
      } else {
        console.log("⚠️ No models data received or empty array");
        setModels([]);
      }
    } catch (error) {
      console.error("❌ Error fetching models:", error);
      toast.error("Error al cargar los modelos: " + error.message);
      setModels([]);
    }
  };

  // useEffect principal - MEJORADO
  useEffect(() => {
    console.log("🔄 Iniciando carga de datos para vehículos...");
    
    // Ejecutar las funciones
    fetchVehicles();
    fetchBrands();
    fetchModels();
    
    // DATOS DE PRUEBA - Si no cargan del servidor después de 5 segundos
    const timeoutId = setTimeout(() => {
      if (brands.length === 0) {
        console.log("⚠️ No se cargaron marcas del servidor, usando datos de prueba");
        setBrands([
          { _id: "temp1", name: "Mercedes-Benz" },
          { _id: "temp2", name: "BMW" },
          { _id: "temp3", name: "Audi" },
          { _id: "temp4", name: "Porsche" },
          { _id: "temp5", name: "Ferrari" },
          { _id: "temp6", name: "Lamborghini" }
        ]);
        toast.info("Usando marcas de prueba - Verifica la conexión del backend");
      }
      
      if (models.length === 0) {
        console.log("⚠️ No se cargaron modelos del servidor, usando datos de prueba");
        setModels([
          { _id: "model1", name: "Clase S" },
          { _id: "model2", name: "Serie 7" },
          { _id: "model3", name: "A8" },
          { _id: "model4", name: "911" },
          { _id: "model5", name: "488 GTB" },
          { _id: "model6", name: "Huracán" },
          { _id: "model7", name: "Aventador" },
          { _id: "model8", name: "Classe C" },
          { _id: "model9", name: "Serie 3" },
          { _id: "model10", name: "A4" }
        ]);
        toast.info("Usando modelos de prueba - Verifica la conexión del backend");
      }
    }, 5000); // 5 segundos

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
    };
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