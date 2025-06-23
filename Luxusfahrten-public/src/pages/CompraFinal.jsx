import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumenCompraNormal from "../components/CompraFinalNormal";
import ResumenCompraRestaurado from "../components/CompraFinalRestaurado";
import { useCompraFinal } from "../hooks/useCompraFinal";
import { toast } from "react-hot-toast";
 
const CompraFinal = () => {
  const [datosCompra, setDatosCompra] = useState(null);
  const [datosVehiculo, setDatosVehiculo] = useState(null);
  const [datosVehiculo2, setDatosVehiculo2] = useState(null);
  const [clienteId, setClienteId] = useState(null);
  const navigate = useNavigate();
 
  const { realizarCompraFinal, loading } = useCompraFinal();
 
  // Genera una fecha aleatoria dentro de los próximos 2 meses
  const getRandomDeliveryDate = () => {
    const now = new Date();
    const maxDays = 60;
    const randomDays = Math.floor(Math.random() * maxDays) + 1;
    const deliveryDate = new Date(now);
    deliveryDate.setDate(now.getDate() + randomDays);
    return deliveryDate.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
 
  const [fechaEntrega] = useState(getRandomDeliveryDate());
 
  useEffect(() => {
    const datos = localStorage.getItem('datosCompra');
    if (datos) setDatosCompra(JSON.parse(datos));
 
    const vehiculo = localStorage.getItem('datosVehiculo');
    if (vehiculo) setDatosVehiculo(JSON.parse(vehiculo));
 
    const vehiculo2 = localStorage.getItem('datosVehiculo2');
    if (vehiculo2) setDatosVehiculo2(JSON.parse(vehiculo2));

    // Obtener el ID del cliente del localStorage o token
    const userId = localStorage.getItem('userId') || localStorage.getItem('clienteId');
    setClienteId(userId);
  }, []);

  // Función para crear/buscar cliente si no existe
  const crearOBuscarCliente = async (datosCliente) => {
    try {
      // Primero intentar buscar cliente por email
      const searchResponse = await fetch(`http://localhost:4000/api/users?email=${datosCliente.email}`);
      
      if (searchResponse.ok) {
        const usuarios = await searchResponse.json();
        if (usuarios.length > 0) {
          return usuarios[0]._id; // Retornar ID del cliente existente
        }
      }

      // Si no existe, crear nuevo cliente
      const clienteData = {
        name: datosCliente.fullName.split(' ')[0] || datosCliente.fullName,
        lastName: datosCliente.fullName.split(' ').slice(1).join(' ') || '',
        email: datosCliente.email,
        telephone: datosCliente.phone,
        address: datosCliente.address,
        document: datosCliente.documentId,
        // Agregar campos requeridos con valores por defecto
        password: 'temp123', // Será necesario que el usuario cambie esto después
        role: 'user'
      };

      const createResponse = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
      });

      if (createResponse.ok) {
        const nuevoCliente = await createResponse.json();
        return nuevoCliente._id || nuevoCliente.user?._id;
      } else {
        throw new Error('No se pudo crear el cliente');
      }
    } catch (error) {
      console.error('Error al crear/buscar cliente:', error);
      throw error;
    }
  };

  // Función para obtener el ID del vehículo
  const obtenerVehiculoId = () => {
    const isRestaurado = !!datosVehiculo2;
    const vehiculoData = isRestaurado ? datosVehiculo2 : datosVehiculo;
    
    // Si tenemos el ID directamente
    if (vehiculoData?._id) {
      return vehiculoData._id;
    }
    
    // Si está en localStorage como parámetro de URL
    const vehiculoIdFromStorage = localStorage.getItem('vehiculoId');
    if (vehiculoIdFromStorage) {
      return vehiculoIdFromStorage;
    }
    
    // Si tenemos que extraerlo de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const vehiculoIdFromUrl = urlParams.get('vehiculoId');
    if (vehiculoIdFromUrl) {
      return vehiculoIdFromUrl;
    }
    
    throw new Error('No se pudo obtener el ID del vehículo');
  };
 
  if (!datosCompra) {
    return <div className="container mt-4">Cargando resumen de compra...</div>;
  }
 
  // Handler para realizar la compra final
  const handleCompraFinal = async () => {
    try {
      const precioFinal = Number(localStorage.getItem('precioFinal')) || 0;
      
      if (precioFinal <= 0) {
        toast.error('Error: Precio total no válido');
        return;
      }

      // Obtener el ID del cliente logueado
      let idCliente = datosCompra.clienteId || datosCompra.userId || localStorage.getItem('clienteId') || localStorage.getItem('userId');
      
      if (!idCliente) {
        toast.error('Error: No se pudo obtener el ID del usuario logueado');
        console.error('No se encontró ID de cliente en:', {
          datosCompra,
          localStorage: {
            clienteId: localStorage.getItem('clienteId'),
            userId: localStorage.getItem('userId')
          }
        });
        return;
      }

      // Obtener el ID del vehículo
      let idVehiculo;
      try {
        idVehiculo = obtenerVehiculoId();
      } catch (error) {
        toast.error('Error: No se pudo obtener el ID del vehículo');
        console.error(error);
        return;
      }

      // Mapear método de pago al formato esperado por el backend
      const mapearMetodoPago = (metodo) => {
        const mapeo = {
          'tarjeta': 'Tarjeta de Crédito',
          'transferencia': 'Transferencia Bancaria',
          'efectivo': 'Efectivo'
        };
        return mapeo[metodo] || metodo;
      };

      // Preparar payload para el backend
      const payload = {
        idCliente: idCliente,
        idVehiculo: idVehiculo,
        metodoPago: mapearMetodoPago(datosCompra.paymentMethod),
        terminosYSeguro: !!datosCompra.termsAccepted, // Usar termsAccepted como base
        precioTotal: precioFinal,
        status: 'Pendiente'
      };

      console.log('Payload enviado al backend:', payload);

      const res = await realizarCompraFinal(payload);
      
      if (res.ok) {
        toast.success('¡Compra realizada exitosamente!');
        // Limpiar localStorage después de compra exitosa
        localStorage.removeItem('datosCompra');
        localStorage.removeItem('datosVehiculo');
        localStorage.removeItem('datosVehiculo2');
        localStorage.removeItem('precioFinal');
        localStorage.removeItem('vehiculoId');
        
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(res.error?.message || 'Error al procesar la compra');
        console.error('Error en la respuesta:', res.error);
      }
    } catch (error) {
      toast.error('Error inesperado al procesar la compra');
      console.error('Error en handleCompraFinal:', error);
    }
  };
 
  return (
    <>
      {datosVehiculo2 ? (
        <ResumenCompraRestaurado
          datosCompra={datosCompra}
          datosVehiculo2={datosVehiculo2}
          fechaEntrega={fechaEntrega}
          onCompraFinal={handleCompraFinal}
          loading={loading}
        />
      ) : (
        <ResumenCompraNormal
          datosCompra={datosCompra}
          datosVehiculo={datosVehiculo}
          fechaEntrega={fechaEntrega}
          onCompraFinal={handleCompraFinal}
          loading={loading}
        />
      )}
      <button
        className="btn btn-primary mt-5"
        onClick={handleCompraFinal}
        disabled={loading}
        style={{
          display: "block",
          margin: "40px auto",
          width: "320px",
          height: "70px",
          fontSize: "2rem",
          fontWeight: "bold",
          borderRadius: "2rem",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)"
        }}
      >
        {loading ? "Procesando..." : "Realizar la compra"}
      </button>
    </>
  );
};
 
export default CompraFinal;