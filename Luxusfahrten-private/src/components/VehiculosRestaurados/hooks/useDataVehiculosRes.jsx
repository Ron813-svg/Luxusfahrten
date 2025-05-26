import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataVehiculosRes = () => {
  const ApiVehiculosRes = "http://localhost:4000/api/restoredvehicles";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [precio, setPrecio] = useState("");
  const [tipo, setTipo] = useState("");
  const [color, setColor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [especificaciones, setEspecificaciones] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [especificacionesRestauracion, setEspecificacionesRestauracion] = useState("");
  const [costoRestauracion, setCostoRestauracion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [errorVehiculo, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vehiculosRes, setVehiculosRes] = useState([]);

  const cleanData = () => {
    setMarca("");
    setModelo("");
    setAnio("");
    setPrecio("");
    setTipo("");
    setColor("");
    setDescripcion("");
    setEspecificaciones("");
    setDisponibilidad("");
    setEspecificacionesRestauracion("");
    setCostoRestauracion("");
    setImagen(null);
    setId("");
  };

  // Registrar vehículo restaurado
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!marca || !modelo || !anio || !precio || !tipo || !color || !descripcion || !especificaciones || !disponibilidad || !especificacionesRestauracion || !costoRestauracion) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("marca", marca);
      formData.append("modelo", modelo);
      formData.append("anio", anio);
      formData.append("precio", precio);
      formData.append("tipo", tipo);
      formData.append("color", color);
      formData.append("descripcion", descripcion);
      formData.append("especificaciones", especificaciones);
      formData.append("disponibilidad", disponibilidad);
      formData.append("especificacionesRestauracion", especificacionesRestauracion);
      formData.append("costoRestauracion", costoRestauracion);
      if (imagen) formData.append("imagen", imagen);

      const response = await fetch(ApiVehiculosRes, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar el vehículo restaurado");
      }

      toast.success("Vehículo restaurado registrado");
      setSuccess("Vehículo restaurado registrado correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Ocurrió un error al registrar el vehículo restaurado");
    } finally {
      setLoading(false);
    }
  };

  // Obtener vehículos restaurados
  const fetchData = async () => {
    try {
      const response = await fetch(ApiVehiculosRes);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setVehiculosRes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar vehículo restaurado
  const deleteVehiculoRes = async (id) => {
    try {
      const response = await fetch(`${ApiVehiculosRes}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete vehicle");
      }

      toast.success("Vehículo restaurado eliminado");
      fetchData();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  // Cargar datos para editar
  const handleUpdateVehiculoRes = (vehiculo) => {
    setId(vehiculo._id);
    setMarca(vehiculo.marca);
    setModelo(vehiculo.modelo);
    setAnio(vehiculo.anio);
    setPrecio(vehiculo.precio);
    setTipo(vehiculo.tipo);
    setColor(vehiculo.color);
    setDescripcion(vehiculo.descripcion);
    setEspecificaciones(vehiculo.especificaciones);
    setDisponibilidad(vehiculo.disponibilidad);
    setEspecificacionesRestauracion(vehiculo.especificacionesRestauracion);
    setCostoRestauracion(vehiculo.costoRestauracion);
    setImagen(vehiculo.imagen || null);
    setError(null);
    setSuccess(null);
    setActiveTab("form");
  };

  // Actualizar vehículo restaurado
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const isNewImageFile = imagen instanceof File;

      let body;
      let headers = {};

      if (isNewImageFile) {
        const formData = new FormData();
        formData.append("marca", marca);
        formData.append("modelo", modelo);
        formData.append("anio", anio);
        formData.append("precio", precio);
        formData.append("tipo", tipo);
        formData.append("color", color);
        formData.append("descripcion", descripcion);
        formData.append("especificaciones", especificaciones);
        formData.append("disponibilidad", disponibilidad);
        formData.append("especificacionesRestauracion", especificacionesRestauracion);
        formData.append("costoRestauracion", costoRestauracion);
        formData.append("imagen", imagen);

        body = formData;
      } else {
        const updatedVehiculo = {
          marca,
          modelo,
          anio,
          precio,
          tipo,
          color,
          descripcion,
          especificaciones,
          disponibilidad,
          especificacionesRestauracion,
          costoRestauracion,
        };

        body = JSON.stringify(updatedVehiculo);
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${ApiVehiculosRes}/${id}`, {
        method: "PUT",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el vehículo restaurado");
      }

      toast.success("Vehículo restaurado actualizado");
      setSuccess("Vehículo restaurado actualizado correctamente");
      cleanData();
      setId("");
      setActiveTab("list");
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar el vehículo restaurado");
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    marca,
    setMarca,
    modelo,
    setModelo,
    anio,
    setAnio,
    precio,
    setPrecio,
    tipo,
    setTipo,
    color,
    setColor,
    descripcion,
    setDescripcion,
    especificaciones,
    setEspecificaciones,
    disponibilidad,
    setDisponibilidad,
    especificacionesRestauracion,
    setEspecificacionesRestauracion,
    costoRestauracion,
    setCostoRestauracion,
    imagen,
    setImagen,
    errorVehiculo,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    vehiculosRes,
    setVehiculosRes,
    cleanData,
    handleSubmit,
    fetchData,
    deleteVehiculoRes,
    handleUpdate,
    handleUpdateVehiculoRes,
  };
};

export default useDataVehiculosRes;