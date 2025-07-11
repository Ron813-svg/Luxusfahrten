import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataVehiculosRes = () => {
  const ApiVehiculosRes = "http://localhost:4000/api/restoredvehicles";
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
  const [restorationSpecs, setRestorationSpecs] = useState("");
  const [restorationCost, setRestorationCost] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehiculosRes, setVehiculosRes] = useState([]);
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
    setRestorationSpecs("");
    setRestorationCost("");
    setImage("");
    setError(null);
    setSuccess(null);
  };

  // Obtener vehículos restaurados
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("🚗 Obteniendo vehículos restaurados...");
      const response = await fetch(ApiVehiculosRes);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Vehículos restaurados:", data);
      setVehiculosRes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching restored vehicles:", error);
      toast.error("Error al obtener la lista de vehículos restaurados");
      setVehiculosRes([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener marcas
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

  // Obtener modelos
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

  useEffect(() => {
    console.log("🔄 Iniciando carga de datos...");
    fetchData();
    fetchBrands();
    fetchModels();
  }, []);

  // Crear vehículo restaurado
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
      restorationSpecs,
      restorationCost,
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
      { field: availability, name: "Disponibilidad" },
      { field: restorationSpecs, name: "Especificaciones de Restauración" },
      { field: restorationCost, name: "Costo de Restauración" }
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
      formData.append("restorationSpecs", restorationSpecs);
      formData.append("restorationCost", restorationCost);
      
      if (image && image instanceof File) {
        formData.append("image", image);
        console.log("📷 Imagen agregada al FormData");
      }

      console.log("🚀 Enviando datos al servidor...");

      const response = await fetch(ApiVehiculosRes, {
        method: "POST",
        body: formData,
      });

      console.log("📡 Respuesta del servidor:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error del servidor:", errorData);
        throw new Error(errorData.message || "Error al registrar el vehículo restaurado");
      }

      const result = await response.json();
      console.log("✅ Vehículo creado:", result);

      toast.success("Vehículo restaurado registrado exitosamente");
      setSuccess("Vehículo restaurado registrado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchData();
    } catch (error) {
      console.error("❌ Error al registrar:", error);
      setError(error.message);
      toast.error(error.message || "Error al registrar el vehículo restaurado");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar vehículo restaurado
  const deleteVehiculoRes = async (vehicleId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este vehículo restaurado?")) {
      return;
    }

    try {
      console.log("🗑️ Eliminando vehículo:", vehicleId);
      const response = await fetch(`${ApiVehiculosRes}/${vehicleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el vehículo restaurado");
      }

      toast.success("Vehículo restaurado eliminado exitosamente");
      await fetchData();
    } catch (error) {
      console.error("❌ Error deleting restored vehicle:", error);
      toast.error("Error al eliminar el vehículo restaurado");
    }
  };

  // Cargar datos para editar
  const handleUpdateVehiculoRes = (vehiculo) => {
    console.log("✏️ Cargando datos para editar:", vehiculo);
    
    setId(vehiculo._id);
    setIdBrand(vehiculo.idBrand?._id || "");
    setIdModel(vehiculo.idModel?._id || "");
    setYear(vehiculo.year?.toString() || "");
    setPrice(vehiculo.price?.toString() || "");
    setType(vehiculo.type || "");
    setColor(vehiculo.color || "");
    setDescription(vehiculo.description || "");
    setSpecs(vehiculo.specs || "");
    setAvailability(vehiculo.availability || "");
    setRestorationSpecs(vehiculo.restorationSpecs || "");
    setRestorationCost(vehiculo.restorationCost?.toString() || "");
    setImage(vehiculo.image || "");
    setError(null);
    setSuccess(null);
    
    setActiveTab("form");
  };

  // Actualizar vehículo restaurado
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!idBrand || !idModel || !year || !price || !type || !color || !description || !specs || !availability || !restorationSpecs || !restorationCost) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Actualizando vehículo:", id);
      
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
        formData.append('restorationSpecs', restorationSpecs);
        formData.append('restorationCost', restorationCost);
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
          restorationSpecs,
          restorationCost: parseFloat(restorationCost),
        };

        body = JSON.stringify(updatedVehicle);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${ApiVehiculosRes}/${id}`, {
        method: "PUT",
        headers,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el vehículo restaurado");
      }

      toast.success("Vehículo restaurado actualizado exitosamente");
      setSuccess("Vehículo restaurado actualizado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchData();
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      setError(error.message);
      toast.error(error.message || "Error al actualizar el vehículo restaurado");
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
    restorationSpecs,
    setRestorationSpecs,
    restorationCost,
    setRestorationCost,
    image,
    setImage,
    error,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    vehiculosRes,
    setVehiculosRes,
    brands,
    setBrands,
    models,
    setModels,
    cleanData,
    handleSubmit,
    fetchData,
    fetchBrands,
    fetchModels,
    deleteVehiculoRes,
    handleUpdateVehiculoRes,
    handleUpdate,
  };
};

export default useDataVehiculosRes;