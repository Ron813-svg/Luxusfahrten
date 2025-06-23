import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ResumenCompraNormal({ datosCompra, datosVehiculo, fechaEntrega }) {
  // Lee el precio final con impuestos del localStorage
  const precioFinal = localStorage.getItem('precioFinal');

  return (
    <div className="container mt-4 p-5 d-flex justify-content-center">
      <div className="card shadow" style={{ width: "600px" }}>
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Resumen de Compra</h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p><strong>Nombre:</strong> {datosCompra.fullName}</p>
              <p><strong>Documento:</strong> {datosCompra.documentId}</p>
              <p><strong>Teléfono:</strong> {datosCompra.phone}</p>
              <p><strong>Email:</strong> {datosCompra.email}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Dirección:</strong> {datosCompra.address}</p>
              <p><strong>Método de pago:</strong> {datosCompra.paymentMethod}</p>
              <p><strong>Seguro:</strong> {datosCompra.insuranceSelected ? "Sí" : "No"}</p>
            </div>
          </div>
          <hr />
          <h4>Detalles de Pago</h4>
          <h3 className="text-success">
            Total a pagar: ${precioFinal ? Number(precioFinal).toLocaleString(undefined, {minimumFractionDigits: 2}) : 'Consultar'}
          </h3>
          <p><strong>Fecha estimada de entrega:</strong> {fechaEntrega}</p>
          
        </div>
      </div>
    </div>
  );
}

export default ResumenCompraNormal;