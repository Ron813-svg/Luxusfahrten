import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ResumenCompra = () => {
  const [datosCompra, setDatosCompra] = useState({
    nombre: "Diego Alberto Santos",
    documento: "82776353-1",
    telefono: "2836-2847",
    email: "Diego@gmail.com",
    direccion: "Colonia Jardin, Pasaje D, Casa 94",
    metodoPago: "Tarjeta de Débito",
    seguro: "No",
    precioVehiculo: 185630,
    modificaciones: 5630,
    gestionEnvio: 1783,
    fechaEntrega: "13 de junio de 2025",
  });

  const totalPagar =
    datosCompra.precioVehiculo +
    datosCompra.modificaciones +
    datosCompra.gestionEnvio;

  return (
    <div className="container mt-4 p-5 d-flex justify-content-center">
      <div className="card shadow" style={{ width: "600px" }}>
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Resumen de Compra</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Nombre:</strong> {datosCompra.nombre}</p>
              <p><strong>Documento:</strong> {datosCompra.documento}</p>
              <p><strong>Teléfono:</strong> {datosCompra.telefono}</p>
              <p><strong>Email:</strong> {datosCompra.email}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Dirección:</strong> {datosCompra.direccion}</p>
              <p><strong>Método de pago:</strong> {datosCompra.metodoPago}</p>
              <p><strong>Seguro:</strong> {datosCompra.seguro}</p>
            </div>
          </div>
          <hr />
          <h4>Detalles de Pago</h4>
          <p><strong>Precio del vehículo:</strong> ${datosCompra.precioVehiculo}</p>
          <p><strong>Modificaciones extra:</strong> ${datosCompra.modificaciones}</p>
          <p><strong>Gestión y envío:</strong> ${datosCompra.gestionEnvio}</p>
          <h3 className="text-success">Total a pagar: ${totalPagar}</h3>
          <p><strong>Fecha estimada de entrega:</strong> {datosCompra.fechaEntrega}</p>
          <button className="btn btn-primary mt-3">Realizar la compra</button>
        </div>
      </div>
    </div>
  );
};

export default ResumenCompra;
