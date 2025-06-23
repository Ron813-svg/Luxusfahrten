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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
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
    setPaymentMethod("");
    setOrderStatus("");
    setOrderDate("");
    setTotalPrice("");
    setError(null);
    setSuccess(null);
  };

  // Obtener pedidos
  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log("Obteniendo lista de pedidos...");
      const response = await fetch(ApiOrders);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Pedidos obtenidos:", data);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error al obtener la lista de pedidos");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Obtener vehículos
  const fetchVehicles = async () => {
    try {
      console.log("Obteniendo vehículos...");
      const response = await fetch(ApiVehicles);
      
      if (!response.ok) {
        console.error("Error response vehicles:", response.status);
        return;
      }
      
      const data = await response.json();
      console.log("Vehículos obtenidos:", data);
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast.error("Error al cargar los vehículos");
    }
  };

  // Obtener clientes
  const fetchClients = async () => {
    try {
      console.log("Obteniendo clientes...");
      const response = await fetch(ApiClients);
      
      if (!response.ok) {
        console.error("Error response clients:", response.status);
        return;
      }
      
      const data = await response.json();
      console.log("Clientes obtenidos:", data);
      setClients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Error al cargar los clientes");
    }
  };

  useEffect(() => {
    console.log("Iniciando carga de datos de pedidos...");
    fetchOrders();
    fetchVehicles();
    fetchClients();
  }, []);

  // Crear pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Datos del pedido:", {
      idVehiculo,
      idCliente,
      paymentMethod,
      orderStatus,
      orderDate,
      totalPrice
    });

    // Validación
    const requiredFields = [
      { field: idVehiculo, name: "Vehículo" },
      { field: idCliente, name: "Cliente" },
      { field: paymentMethod, name: "Método de pago" },
      { field: orderStatus, name: "Estado del pedido" },
      { field: orderDate, name: "Fecha del pedido" },
      { field: totalPrice, name: "Precio total" }
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
      const orderData = {
        idVehiculo,
        idCliente,
        paymentMethod,
        orderStatus,
        orderDate,
        totalPrice: parseFloat(totalPrice)
      };

      console.log("Enviando datos al servidor...");

      const response = await fetch(ApiOrders, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log("Respuesta del servidor:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        throw new Error(errorData.message || "Error al crear el pedido");
      }

      const result = await response.json();
      console.log("Pedido creado:", result);

      toast.success("Pedido creado exitosamente");
      setSuccess("Pedido creado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchOrders();
    } catch (error) {
      console.error("Error al crear pedido:", error);
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
      console.log("Eliminando pedido con ID:", orderId);
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
      console.error("Error deleting order:", error);
      toast.error("Error al eliminar el pedido");
    }
  };

  // Cargar datos para editar
  const handleUpdateOrder = (order) => {
    console.log("Cargando datos del pedido para editar:", order);
    
    setId(order._id);
    setIdVehiculo(order.idVehiculo?._id || order.idVehiculo || "");
    setIdCliente(order.idCliente?._id || order.idCliente || "");
    setPaymentMethod(order.paymentMethod || "");
    setOrderStatus(order.orderStatus || "");
    setOrderDate(order.orderDate?.slice(0, 10) || "");
    setTotalPrice(order.totalPrice?.toString() || "");
    setError(null);
    setSuccess(null);
    
    setActiveTab("form");
  };

  // Actualizar pedido
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!idVehiculo || !idCliente || !paymentMethod || !orderStatus || !orderDate || !totalPrice) {
      setError("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Actualizando pedido con ID:", id);
      
      const updatedOrder = {
        idVehiculo,
        idCliente,
        paymentMethod,
        orderStatus,
        orderDate,
        totalPrice: parseFloat(totalPrice)
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
      console.error("Error al actualizar:", error);
      setError(error.message);
      toast.error(error.message || "Error al actualizar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    idVehiculo,
    setIdVehiculo,
    idCliente,
    setIdCliente,
    paymentMethod,
    setPaymentMethod,
    orderStatus,
    setOrderStatus,
    orderDate,
    setOrderDate,
    totalPrice,
    setTotalPrice,
    error,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    orders,
    setOrders,
    vehicles,
    setVehicles,
    clients,
    setClients,
    cleanData,
    handleSubmit,
    fetchOrders,
    fetchVehicles,
    fetchClients,
    deleteOrder,
    handleUpdateOrder,
    handleUpdate,
  };
};

export default useDataPedido;