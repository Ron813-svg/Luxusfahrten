import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataPedido = () => {
  const ApiOrders = "http://localhost:4000/api/orders";
  const ApiVehicles = "http://localhost:4000/api/vehicles";
  const ApiClients = "http://localhost:4000/api/users";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [idVehiculo, setIdVehiculo] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [terminosYSeguro, setTerminosYSeguro] = useState(false);
  const [precioTotal, setPrecioTotal] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [clients, setClients] = useState([]);

  const cleanData = () => {
    setId("");
    setIdVehiculo("");
    setIdCliente("");
    setMetodoPago("");
    setTerminosYSeguro(false);
    setPrecioTotal("");
    setStatus("");
    setError(null);
    setSuccess(null);
  };

  // Obtener pedidos
  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log("🔍 Obteniendo lista de pedidos...");
      const response = await fetch(ApiOrders);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Pedidos obtenidos:", data);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      toast.error("Error al obtener la lista de pedidos");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener vehículos
  const fetchVehicles = async () => {
    try {
      console.log("🚗 Obteniendo vehículos...");
      const response = await fetch(ApiVehicles);
      
      if (!response.ok) {
        console.error("Error response vehicles:", response.status);
        return;
      }
      
      const data = await response.json();
      console.log("✅ Vehículos obtenidos:", data);
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching vehicles:", error);
      toast.error("Error al cargar los vehículos");
    }
  };

  // Obtener clientes
  const fetchClients = async () => {
    try {
      console.log("👥 Obteniendo clientes...");
      const response = await fetch(ApiClients);
      
      if (!response.ok) {
        console.error("Error response clients:", response.status);
        return;
      }
      
      const data = await response.json();
      console.log("✅ Clientes obtenidos:", data);
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("❌ Error fetching clients:", error);
      toast.error("Error al cargar los clientes");
    }
  };

  useEffect(() => {
    console.log("🚀 Iniciando carga de datos de pedidos...");
    fetchOrders();
    fetchVehicles();
    fetchClients();
  }, []);

  // Crear pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("📝 Datos del pedido a enviar:", {
      idVehiculo,
      idCliente,
      metodoPago,
      terminosYSeguro,
      precioTotal,
      status
    });

    // Validación de campos obligatorios
    const requiredFields = [
      { field: idVehiculo, name: "Vehículo" },
      { field: idCliente, name: "Cliente" },
      { field: metodoPago, name: "Método de pago" },
      { field: precioTotal, name: "Precio total" },
      { field: status, name: "Estado del pedido" }
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

    // Validar términos y seguro
    if (!terminosYSeguro) {
      const errorMsg = "Debe aceptar los términos y condiciones";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        idVehiculo,
        idCliente,
        metodoPago,
        terminosYSeguro,
        precioTotal: parseFloat(precioTotal),
        status
      };

      console.log("🚀 Enviando datos al servidor:", orderData);

      const response = await fetch(ApiOrders, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log("📡 Respuesta del servidor:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error del servidor:", errorData);
        throw new Error(errorData.message || "Error al crear el pedido");
      }

      const result = await response.json();
      console.log("✅ Pedido creado:", result);

      toast.success("Pedido creado exitosamente");
      setSuccess("Pedido creado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchOrders();
    } catch (error) {
      console.error("❌ Error al crear pedido:", error);
      setError(error.message);
      toast.error(error.message || "Error al crear el pedido");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar pedido
  const deleteOrder = async (orderId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      return;
    }

    try {
      console.log("🗑️ Eliminando pedido con ID:", orderId);
      const response = await fetch(`${ApiOrders}/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el pedido");
      }

      toast.success("Pedido eliminado exitosamente");
      await fetchOrders();
    } catch (error) {
      console.error("❌ Error deleting order:", error);
      toast.error("Error al eliminar el pedido");
    }
  };

  // Cargar datos para editar
  const handleUpdateOrder = (order) => {
    console.log("📝 Cargando datos del pedido para editar:", order);
    
    setId(order._id);
    setIdVehiculo(order.idVehiculo?._id || order.idVehiculo || "");
    setIdCliente(order.idCliente?._id || order.idCliente || "");
    setMetodoPago(order.metodoPago || "");
    setTerminosYSeguro(order.terminosYSeguro || false);
    setPrecioTotal(order.precioTotal?.toString() || "");
    setStatus(order.status || "");
    setError(null);
    setSuccess(null);
    
    setActiveTab("form");
  };

  // Actualizar pedido
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validación
    if (!idVehiculo || !idCliente || !metodoPago || !precioTotal || !status) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if (!terminosYSeguro) {
      setError("Debe aceptar los términos y condiciones");
      toast.error("Debe aceptar los términos y condiciones");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Actualizando pedido con ID:", id);
      
      const updatedOrder = {
        idVehiculo,
        idCliente,
        metodoPago,
        terminosYSeguro,
        precioTotal: parseFloat(precioTotal),
        status
      };

      const response = await fetch(`${ApiOrders}/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el pedido");
      }

      toast.success("Pedido actualizado exitosamente");
      setSuccess("Pedido actualizado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchOrders();
    } catch (error) {
      console.error("❌ Error al actualizar:", error);
      setError(error.message);
      toast.error(error.message || "Error al actualizar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return {
    // Estados de la UI
    activeTab,
    setActiveTab,
    loading,
    error,
    success,
    
    // Estados del formulario
    id,
    setId,
    idVehiculo,
    setIdVehiculo,
    idCliente,
    setIdCliente,
    metodoPago,
    setMetodoPago,
    terminosYSeguro,
    setTerminosYSeguro,
    precioTotal,
    setPrecioTotal,
    status,
    setStatus,
    
    // Datos
    orders,
    vehicles,
    clients,
    
    // Funciones
    cleanData,
    handleSubmit,
    deleteOrder,
    handleUpdateOrder,
    handleUpdate,
    fetchOrders,
    fetchVehicles,
    fetchClients,
    
    // Setters adicionales
    setError,
    setSuccess,
    setLoading,
    setOrders,
    setVehicles,
    setClients
  };
};

export default useDataPedido;