import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumenCompraNormal from "../components/CompraFinalNormal";
import ResumenCompraRestaurado from "../components/CompraFinalRestaurado";
import { useCompraFinal } from "../hooks/useCompraFinal";
 
const CompraFinal = () => {
  const [datosCompra, setDatosCompra] = useState(null);
  const [datosVehiculo, setDatosVehiculo] = useState(null);
  const [datosVehiculo2, setDatosVehiculo2] = useState(null);
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
  }, []);
 
  if (!datosCompra) {
    return <div className="container mt-4">Cargando resumen de compra...</div>;
  }
 
  // Handler para realizar la compra final
  const handleCompraFinal = async () => {
    const precioFinal = Number(localStorage.getItem('precioFinal')) || 0;
 
    const fechaISO = (() => {
      const partes = fechaEntrega.split(" de ");
      if (partes.length === 3) {
        const [dia, mesStr, anio] = partes;
        const meses = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        const mes = meses.indexOf(mesStr.toLowerCase());
        if (mes !== -1) {
          return new Date(Number(anio), mes, Number(dia));
        }
      }
      return new Date();
    })();
 
    const isRestaurado = !!datosVehiculo2;
    const vehiculoData = isRestaurado ? datosVehiculo2 : datosVehiculo;
 
    const payload = {
      name: datosCompra.fullName,
      document: datosCompra.documentId,
      phone: datosCompra.phone,
      email: datosCompra.email,
      address: datosCompra.address,
      paymentMethod: datosCompra.paymentMethod,
      insurance: !!datosCompra.insuranceSelected,
      totalAmount: precioFinal,
      estimatedDeliveryDate: fechaISO,
      ...vehiculoData,
      tipo: isRestaurado ? "restaurado" : "normal"
    };
 
    const res = await realizarCompraFinal(payload);
    if (res.ok) {
     
      setTimeout(() => navigate('/'), 2000);
    } else {
     
      setTimeout(() => navigate('/'), 2000);
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
 