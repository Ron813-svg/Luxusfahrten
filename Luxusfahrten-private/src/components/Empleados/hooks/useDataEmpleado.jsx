import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataModerator = () => {
  const ApiRegister = "http://localhost:4000/api/registerModerator";
  const ApiModerators = "http://localhost:4000/api/moderator";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [actualDate, setActualDate] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [image, setImage] = useState("");
  const [errorModerator, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [moderators, setModerators] = useState([]);

  const cleanData = () => {
    setName("");
    setActualDate("");
    setBirthday("");
    setAddress("");
    setEmail("");
    setPassword("");
    setTelephone("");
    setEmployeeType("");
    setImage("");
    setId("");
    setError(null);
    setSuccess(null);
  };

  // Registrar moderador
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !name ||
      !actualDate ||
      !birthday ||
      !address ||
      !email ||
      !password ||
      !telephone ||
      !employeeType
    ) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("actualDate", actualDate);
      formData.append("birthday", birthday);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("telephone", telephone);
      formData.append("employeeType", employeeType);
      if (image && image instanceof File) {
        formData.append("image", image);
      }

      console.log("Enviando datos para crear moderador...");

      const response = await fetch(ApiRegister, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar el moderador");
      }

      const result = await response.json();
      toast.success("Moderador registrado exitosamente");
      setSuccess("Moderador registrado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchData();
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(error.message);
      toast.error(error.message || "Ocurrió un error al registrar el moderador");
    } finally {
      setLoading(false);
    }
  };

  // Obtener moderadores
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Obteniendo lista de moderadores...");
      const response = await fetch(ApiModerators);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Moderadores obtenidos:", data);
      setModerators(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error al obtener la lista de empleados");
      setModerators([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar moderador
  const deleteModerator = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      return;
    }

    try {
      console.log("Eliminando moderador con ID:", id);
      const response = await fetch(`${ApiModerators}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete moderator");
      }

      toast.success("Moderador eliminado exitosamente");
      await fetchData();
    } catch (error) {
      console.error("Error deleting moderator:", error);
      toast.error("Error al eliminar el moderador");
    }
  };

  // Cargar datos para editar
  const handleUpdateEmpleado = (empleado) => {
    console.log("Cargando datos del empleado para editar:", empleado);
    
    setId(empleado._id);
    setName(empleado.name || "");
    setActualDate(empleado.actualDate?.slice(0, 10) || "");
    setBirthday(empleado.birthday?.slice(0, 10) || "");
    setAddress(empleado.address || "");
    setEmail(empleado.email || "");
    setPassword(''); // Por seguridad, siempre vacío
    setTelephone(empleado.telephone || "");
    setEmployeeType(empleado.employeeType || "");
    setImage(empleado.image || "");
    setError(null);
    setSuccess(null);
    
    setActiveTab("form");
  };

  // Actualizar moderador
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !name ||
      !actualDate ||
      !birthday ||
      !address ||
      !email ||
      !telephone ||
      !employeeType
    ) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      console.log("Actualizando moderador con ID:", id);
      
      // Verificar si hay una nueva imagen
      const hasNewImage = image instanceof File;
      
      let body;
      let headers = {};

      if (hasNewImage) {
        // Si hay nueva imagen, usar FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('actualDate', actualDate);
        formData.append('birthday', birthday);
        formData.append('address', address);
        formData.append('email', email);
        if (password && password.trim() !== '') {
          formData.append('password', password);
        }
        formData.append('telephone', telephone);
        formData.append('employeeType', employeeType);
        formData.append('image', image);
        
        body = formData;
      } else {
        // Sin nueva imagen, usar JSON
        const updatedModerator = {
          name,
          actualDate,
          birthday,
          address,
          email,
          telephone,
          employeeType,
        };

        if (password && password.trim() !== '') {
          updatedModerator.password = password;
        }

        body = JSON.stringify(updatedModerator);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${ApiModerators}/${id}`, {
        method: "PUT",
        headers,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el moderador");
      }

      const result = await response.json();
      toast.success("Moderador actualizado exitosamente");
      setSuccess("Moderador actualizado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchData();
    } catch (error) {
      console.error("Error al actualizar:", error);
      setError(error.message);
      toast.error(error.message || "Error al actualizar el moderador");
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    name,
    setName,
    actualDate,
    setActualDate,
    birthday,
    setBirthday,
    address,
    setAddress,
    email,
    setEmail,
    password,
    setPassword,
    telephone,
    setTelephone,
    employeeType,
    setEmployeeType,
    image,
    setImage,
    errorModerator,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    moderators,
    setModerators,
    cleanData,
    handleSubmit,
    fetchData,
    deleteModerator,
    updateModerator: handleUpdateEmpleado, // Alias para compatibilidad
    handleUpdate,
    handleUpdateEmpleado,
  };
};

export default useDataModerator;