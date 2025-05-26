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
  };

  // Registrar moderador
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      if (image) formData.append("image", image);

      const response = await fetch(ApiRegister, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar el moderador");
      }

      toast.success("Moderador registrado");
      setSuccess("Moderador registrado correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Ocurrió un error al registrar el moderador");
    } finally {
      setLoading(false);
    }
  };

  // Obtener moderadores
  const fetchData = async () => {
    try {
      const response = await fetch(ApiModerators);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setModerators(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar moderador
  const deleteModerator = async (id) => {
    try {
      const response = await fetch(`${ApiModerators}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete moderator");
      }

      toast.success("Moderador eliminado");
      fetchData();
    } catch (error) {
      console.error("Error deleting moderator:", error);
    }
  };

  // FUNCIÓN CORREGIDA: Cargar datos para editar
  const handleUpdateEmpleado = (empleado) => {
    console.log("Cargando datos del empleado:", empleado); // Para debug
    
    setId(empleado._id);
    setName(empleado.name);
    setActualDate(empleado.actualDate?.slice(0, 10) || "");
    setBirthday(empleado.birthday?.slice(0, 10) || "");
    setAddress(empleado.address);
    setEmail(empleado.email);
    setPassword(''); // Por seguridad, normalmente no se rellena
    setTelephone(empleado.telephone);
    setEmployeeType(empleado.employeeType);
    setImage(empleado.image || "");
    setError(null);
    setSuccess(null);
    
    // IMPORTANTE: Cambiar a la pestaña del formulario
    setActiveTab("form");
  };

  // Función duplicada - mantener para compatibilidad pero usar handleUpdateEmpleado
  const updateModerator = async (dataModerator) => {
    setId(dataModerator._id);
    setName(dataModerator.name);
    setActualDate(dataModerator.actualDate?.slice(0, 10) || "");
    setBirthday(dataModerator.birthday?.slice(0, 10) || "");
    setAddress(dataModerator.address);
    setEmail(dataModerator.email);
    setTelephone(dataModerator.telephone);
    setEmployeeType(dataModerator.employeeType);
    setImage(dataModerator.image || "");
    setError(null);
    setSuccess(null);
    setActiveTab("form");
  };

  // Actualizar moderador
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Verificar si la imagen es un archivo nuevo o una URL existente
      const isNewImageFile = image instanceof File;
      
      let body;
      let headers = {};

      if (isNewImageFile) {
        // Si hay una nueva imagen, usar FormData
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
        // No establecer Content-Type para FormData, el navegador lo hará automáticamente
      } else {
        // Si no hay nueva imagen, usar JSON
        const updatedModerator = {
          name,
          actualDate,
          birthday,
          address,
          email,
          telephone,
          employeeType,
        };

        // Solo incluir password si no está vacío
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
        throw new Error("Error al actualizar el moderador");
      }

      toast.success("Moderador actualizado");
      setSuccess("Moderador actualizado correctamente");
      cleanData();
      setId("");
      setActiveTab("list");
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar el moderador");
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
    updateModerator,
    handleUpdate,
    handleUpdateEmpleado, // Esta es la función principal que debes usar
  };
};

export default useDataModerator;