import React from "react";
import "./OrderModal.css";
//Este seria el modal para agregar un pedido
//El modal tiene un overlay y un contenedor
const OrderModal = ({ onClose }) => {
  return (
    <div className="order-modal-overlay">
      <div className="order-modal-container">
        <button className="order-modal-close" onClick={onClose}>
          &times;
        </button>

        <div className="order-modal-form-group">
          <label htmlFor="vehiculo">Vehículo</label>
          <select id="vehiculo">
            <option>Seleccione el vehículo</option>
          </select>
        </div>

        <div className="order-modal-form-group">
          <label htmlFor="cliente">Cliente</label>
          <select id="cliente">
            <option>Seleccione el cliente</option>
          </select>
        </div>
          
        <div className="order-modal-form-group">
          <label htmlFor="pago">Método de pago</label>
          <input type="text" id="pago" placeholder="Correo electrónico" />
        </div>

        <div className="order-modal-form-group">
          <label htmlFor="fecha">Fecha del pedido</label>
          <input type="date" id="fecha" />
        </div>

        <div className="order-modal-form-group">
          <label htmlFor="Precio">Precio</label>
          <input
            type="text"
            placeholder="Ingrese el el precio final"
          />
        </div>

        <button className="order-modal-button">Agregar</button>
      </div>
    </div>
  );
};

export default OrderModal;
